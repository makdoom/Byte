import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";
import { JWTDataType } from "../types";
import { sign } from "hono/jwt";

export const encryptPassword = async (password: string) => {
  try {
    const rounds = 10;
    const saltRound = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    return hashedPassword;
  } catch (error) {
    throw new HTTPException(411, {
      message: "Something went wrong while data encryption",
    });
  }
};

export const checkIsPasswordMatched = async (
  userPassword: string,
  hashedPassword: string
) => {
  try {
    let isVerified = await bcrypt.compare(userPassword, hashedPassword);
    return isVerified;
  } catch (error) {
    throw new HTTPException(411, {
      message: "Something went wrong while user verification",
    });
  }
};

export const getJWTtokenTime = (days: 1 | 7) =>
  Math.floor(
    (days == 1
      ? Date.now() + 24 * 60 * 60 * 1000 //
      : Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000
  );

export const getTokens = async ({
  id,
  accessTokenSecret,
  refreshTokenSecret,
}: JWTDataType) => {
  const accessToken = await sign(
    { id: id, exp: getJWTtokenTime(1) },
    accessTokenSecret
  );
  const refreshToken = await sign(
    { id: id, exp: getJWTtokenTime(7) },
    refreshTokenSecret
  );

  return { accessToken, refreshToken };
};

export const getTokensFromCookie = (cookie: string) => {
  try {
    let accessToken = "";
    let refreshToken = "";

    let splitedCookie = cookie.split(";").map((item) => item.trim());
    accessToken = splitedCookie[0].split("=").at(-1) || "";
    refreshToken = splitedCookie[1].split("=").at(-1) || "";
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
