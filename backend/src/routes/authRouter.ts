import { Hono } from "hono";
import { Bindings } from "../types";
import { getPrisma } from "../config";
import { HTTPException } from "hono/http-exception";
import {
  ApiResponse,
  ErrorResponse,
  extendContext,
  ExtendedContext,
} from "../utils/customResponses";
import {
  checkIsPasswordMatched,
  encryptPassword,
  getTokens,
  getTokensFromCookie,
} from "../utils";
import { deleteCookie, setCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { ONE_DAY, SEVEN_DAYS } from "../constants";
import { signinPayload, signupPayload } from "@makdoom/medium-common";

const authRouter = new Hono<{ Bindings: Bindings }>();

authRouter.post("/signup", async (c) => {
  const { sendSuccess, req, status } = extendContext(c) as ExtendedContext;

  const body = await req.json();
  const { success } = signupPayload.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  if (!body.email)
    throw new HTTPException(411, { message: "Please enter a valid email" });
  if (!body.password)
    throw new HTTPException(411, { message: "Please enter a valid password" });

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    let hashedPassword = await encryptPassword(body.password);
    let user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name ? body.name : "",
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    // Generate token
    const createTokenPayload = {
      id: user.id,
      accessTokenSecret: c.env.ACCESS_TOKEN_SECRET,
      refreshTokenSecret: c.env.REFRESH_TOKEN_SECRET,
    };
    const { accessToken, refreshToken } = await getTokens(createTokenPayload);

    // Setting access token in cookie for 1 day
    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: ONE_DAY,
    });

    // Setting refresh token in cookie for 7 days
    setCookie(c, "refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: SEVEN_DAYS,
    });

    let userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
    return sendSuccess(200, userResponse, "User signup successfully");
  } catch (error) {
    return c.json(ErrorResponse(error));
  }
});

authRouter.post("/signin", async (c) => {
  const { sendSuccess, req, status } = extendContext(c) as ExtendedContext;

  const body = await req.json();
  const { success } = signinPayload.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  if (!body.email)
    throw new HTTPException(411, { message: "Please enter a valid email" });
  if (!body.password)
    throw new HTTPException(411, { message: "Please enter a valid password" });

  const prisma = getPrisma(c.env.DATABASE_URL);
  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new HTTPException(411, {
      message: "No user found with the email id provided",
    });
  }

  const isPasswordMatched = await checkIsPasswordMatched(
    body.password,
    user.password
  );
  if (!isPasswordMatched)
    throw new HTTPException(411, {
      message: "Invalid password provided",
    });

  // Generate token
  const createTokenPayload = {
    id: user.id,
    accessTokenSecret: c.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: c.env.REFRESH_TOKEN_SECRET,
  };
  const { accessToken, refreshToken } = await getTokens(createTokenPayload);

  // Setting access token in cookie for 1 day
  setCookie(c, "accessToken", accessToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: ONE_DAY,
  });

  // Setting refresh token in cookie for 7 days
  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: SEVEN_DAYS,
  });

  let userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
  };
  return sendSuccess(200, userResponse, "User login successfully");
});

authRouter.get("/logout", async (c) => {
  const { sendSuccess, status } = extendContext(c) as ExtendedContext;

  deleteCookie(c, "accessToken");
  deleteCookie(c, "refreshToken");

  status(200);
  return sendSuccess(200, null, "User logout successfully");
});

authRouter.get("/get-user", async (c) => {
  let cookie = c.req.header("cookie");
  if (!cookie) {
    c.status(200);
    return c.json({
      error: "Unauthorized user",
      isAuthorized: false,
      statusCode: 200,
      user: null,
    });
  }

  const { accessToken } = getTokensFromCookie(cookie);
  if (!accessToken) {
    c.status(200);
    return c.json({
      error: "Unauthorized user",
      isAuthorized: false,
      statusCode: 200,
      user: null,
    });
  }

  // Check access token is valid or not
  try {
    let { id } = await verify(accessToken, c.env.ACCESS_TOKEN_SECRET);
    if (typeof id == "string") {
      const prisma = getPrisma(c.env.DATABASE_URL);
      let user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true },
      });
      return c.json({
        ...ApiResponse(200, "User fetched successfully", user),
        isAuthorized: true,
      });
    } else {
      return c.json({
        ...ApiResponse(400, "User details not found", null),
        isAuthorized: false,
      });
    }
  } catch (error) {
    c.status(401);
    throw new HTTPException(401, { message: "Unauthorized user" });
  }
});

authRouter.post("/token", async (c) => {
  const { sendSuccess, status, req, env } = extendContext(c) as ExtendedContext;

  let cookie = req.header("cookie");
  if (!cookie) {
    status(401);
    return sendSuccess(410, null, "Unauthorized user");
  }
  const { refreshToken } = getTokensFromCookie(cookie);

  if (!refreshToken) {
    status(401);
    return sendSuccess(401, null, "Refresh token is required");
  }

  try {
    const { id } = await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET);
    if (typeof id == "string") {
      const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = env;
      // Generate both new access and refresh token
      const tokens = await getTokens({
        id,
        accessTokenSecret: ACCESS_TOKEN_SECRET,
        refreshTokenSecret: REFRESH_TOKEN_SECRET,
      });

      deleteCookie(c, "accessToken");
      deleteCookie(c, "refreshToken");

      // Setting access token in cookie for 1 day
      setCookie(c, "accessToken", tokens.accessToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: ONE_DAY,
      });

      //Setting refresh token in cookie for 7 days
      setCookie(c, "refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: SEVEN_DAYS,
      });
      status(200);
      return sendSuccess(
        200,
        {
          newAccessToken: tokens.accessToken,
        },
        "New token generated"
      );
    }
  } catch (error) {
    console.log(error);
    throw new HTTPException(401, {
      message: "Refresh token expired / invalid",
    });
  }
});

export default authRouter;
