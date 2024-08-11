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
  createUserName,
  encryptPassword,
  getTokens,
  getTokensFromCookie,
} from "../utils";
import { deleteCookie, setCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { ONE_DAY, SEVEN_DAYS } from "../constants";
import { SigninReqSchema } from "@makdoom/byte-common";

const authRouter = new Hono<{ Bindings: Bindings }>();

authRouter.post("/signup", async (c) => {
  const { sendSuccess, req, status } = extendContext(c) as ExtendedContext;

  const body = await req.json();
  const { success } = SigninReqSchema.safeParse(body);
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
    const username = createUserName(body.email);
    let user = await prisma.user.create({
      data: {
        email: body.email,
        username: username,
        name: body.name ? body.name : "",
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
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
      username: user.username,
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
  const { success } = SigninReqSchema.safeParse(body);
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
    username: user.username,
    profileURL: user.profileURL,
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
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;

  let cookie = req.header("cookie");
  if (!cookie) {
    status(400);
    throw new HTTPException(400, { message: "Unauthorized user" });
  }
  const { accessToken } = getTokensFromCookie(cookie);
  if (!accessToken) {
    status(400);
    throw new HTTPException(400, { message: "Unauthorized user" });
  }

  // Check access token is valid or not
  try {
    let { id } = await verify(accessToken, c.env.ACCESS_TOKEN_SECRET);
    if (typeof id == "string") {
      const prisma = getPrisma(c.env.DATABASE_URL);
      let user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          profileURL: true,
        },
      });

      status(200);
      return sendSuccess(
        200,
        user ? { ...user, isAuthorized: true } : { isAuthorized: true },
        "User fetched successfully"
      );
    } else {
      status(400);
      throw new HTTPException(400, { message: "Unauthorized user" });
    }
  } catch (error) {
    c.status(400);
    throw new HTTPException(400, { message: "Unauthorized user" });
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
