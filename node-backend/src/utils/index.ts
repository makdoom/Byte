import bcrypt from "bcryptjs";
import { ValidationError } from "./ApiError";
import { sign } from "jsonwebtoken";
import { Request } from "express";
import { UserProfileType } from "@makdoom/byte-common";

export interface CustomRequest extends Request {
  user?: UserProfileType;
}

export const encryptPassword = async (password: string) => {
  try {
    const rounds = 10;
    const saltRound = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    return hashedPassword;
  } catch (error) {
    throw new ValidationError(error);
  }
};

const generateRandomString = () => Math.random().toString(36).slice(2, 8);

export const generateUsername = (email: string) => {
  if (email.includes("@")) {
    return email?.split("@")?.at(0) ?? "";
  } else {
    return generateRandomString();
  }
};

export const getJWTtokenTime = (days: 1 | 7) =>
  Math.floor(
    (days == 1
      ? Date.now() + 24 * 60 * 60 * 1000 //
      : Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000,
  );

export const generateTokens = (id: string) => {
  try {
    const accessToken = sign(
      { id, exp: getJWTtokenTime(1) },
      process.env.ACCESS_TOKEN_SECRET,
    );

    const refreshToken = sign(
      { id, exp: getJWTtokenTime(7) },
      process.env.REFRESH_TOKEN_SECRET,
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const checkIsPasswordMatched = async (
  userPassword: string,
  hashedPassword: string,
) => {
  try {
    const isVerified = await bcrypt.compare(userPassword, hashedPassword);
    return isVerified;
  } catch (error) {
    throw new ValidationError(error);
  }
};
