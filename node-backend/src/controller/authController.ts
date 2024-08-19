import { CookieOptions, NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/ApiResponse";
import { SigninReqSchema, SignupReqSchema } from "@makdoom/byte-common";
import { ValidationError } from "../utils/ApiError";
import { signinUserService, signupService } from "../services/authService";
import { CustomRequest, generateTokens } from "../utils";
import { ONE_DAY_COOKIE, SEVEN_DAYS_COOKIE } from "../constant";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  try {
    const { success } = SignupReqSchema.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    const user = await signupService(body);

    const { accessToken, refreshToken } = generateTokens(user.id);

    const httpCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, {
      ...httpCookieOptions,
      maxAge: ONE_DAY_COOKIE,
    });
    res.cookie("refreshToken", refreshToken, {
      ...httpCookieOptions,
      maxAge: SEVEN_DAYS_COOKIE,
    });

    return sendSuccessResponse(
      res,
      { ...user, accessToken },
      "User registered successfully",
    );
  } catch (error) {
    next(error);
  }
};

export const signinUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  try {
    const { success } = SigninReqSchema.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    const user = await signinUserService(body);

    const { accessToken, refreshToken } = generateTokens(user.id);

    const httpCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, {
      ...httpCookieOptions,
      maxAge: ONE_DAY_COOKIE,
    });
    res.cookie("refreshToken", refreshToken, {
      ...httpCookieOptions,
      maxAge: SEVEN_DAYS_COOKIE,
    });

    return sendSuccessResponse(
      res,
      { ...user, accessToken },
      "User logged in successfully",
    );
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    return sendSuccessResponse(
      res,
      { ...req.user, isAuthorized: true },
      "user",
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const httpCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    res.clearCookie("accessToken", httpCookieOptions);
    res.clearCookie("refreshToken", httpCookieOptions);

    return sendSuccessResponse(res, null, "User logout successfully");
  } catch (error) {
    next(error);
  }
};

export const generateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.user?.id);
  try {
    // Generate both new access and refresh token
    const { accessToken, refreshToken } = generateTokens(req.user?.id);

    const httpCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    res.clearCookie("accessToken", httpCookieOptions);
    res.clearCookie("refreshToken", httpCookieOptions);

    res.cookie("accessToken", accessToken, {
      ...httpCookieOptions,
      maxAge: ONE_DAY_COOKIE,
    });
    res.cookie("refreshToken", refreshToken, {
      ...httpCookieOptions,
      maxAge: SEVEN_DAYS_COOKIE,
    });

    return sendSuccessResponse(
      res,
      { newAccessToken: accessToken },
      "Token generated successfully",
    );
  } catch (error) {
    next(error);
  }
};
