import { NextFunction, Response } from "express";
import { sendSuccessResponse } from "../utils/ApiResponse";
import {
  getUserProfileService,
  updateUserProfileService,
} from "../services/userService";
import { CustomRequest } from "../utils";
import { UserToEditSchema } from "@makdoom/byte-common";
import { ValidationError } from "../utils/ApiError";

export const getUserProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    // TODO: Need to add zod schema validation of body

    const userProfile = await getUserProfileService(body.userId);

    return sendSuccessResponse(
      res,
      { ...userProfile, isAuthorized: true },
      "User profile fetched successfully",
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const userId = req.user?.id;
    const { success } = UserToEditSchema.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    const updatedUser = await updateUserProfileService(body, userId);
    sendSuccessResponse(
      res,
      { ...updatedUser, isAuthorized: true },
      "User updated successfully",
    );
  } catch (error) {
    next(error);
  }
};
