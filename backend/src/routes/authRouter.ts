import { Hono } from "hono";
import { signinInput, signupInput } from "@makdoom/medium-common";

import { Bindings } from "../types";
import { getPrisma } from "../config";
import { HTTPException } from "hono/http-exception";
import { ApiResponse, ErrorResponse } from "../utils/customResponse";
import {
  checkIsPasswordMatched,
  encryptPassword,
  getTokens,
  getTokensFromCookie,
} from "../utils";
import { deleteCookie, setCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { ONE_DAY, SEVEN_DAYS } from "../constants";

const authRouter = new Hono<{ Bindings: Bindings }>();

authRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
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

    return c.json({
      accessToken,
      ...ApiResponse(200, "User created successfully", user),
    });
  } catch (error) {
    return c.json(ErrorResponse(error));
  }
});

authRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  if (!body.email)
    throw new HTTPException(411, { message: "Please enter a valid email" });
  if (!body.password)
    throw new HTTPException(411, { message: "Please enter a valid password" });

  // const dcryptedPassword = await decryptPassword()
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

  // // Setting refresh token in cookie for 7 days
  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: SEVEN_DAYS,
  });

  return c.json({
    accessToken,
    ...ApiResponse(200, "User login successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
    }),
  });
});

authRouter.post("/token", async (c) => {
  let cookie = c.req.header("cookie");
  if (!cookie) {
    c.status(401);
    return c.json({ error: "Unauthorized user", statusCode: 401 });
  }
  const { refreshToken } = getTokensFromCookie(cookie);

  if (!refreshToken) {
    c.status(401);
    return c.json({ error: "Refresh token is required" });
  }

  try {
    const { id } = await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET);
    if (typeof id == "string") {
      const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = c.env;
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
      c.status(200);
      return c.json({
        newAccessToken: tokens.accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    throw new HTTPException(401, {
      message: "Refresh token expired / invalid",
    });
  }
});

export default authRouter;
