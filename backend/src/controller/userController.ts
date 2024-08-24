import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/ApiResponse";
import { getUserProfileService } from "../services/userService";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    // TODO: Need to add zod schema validation of body

    const userProfile = await getUserProfileService(body.userId);

    return sendSuccessResponse(
      res,
      userProfile,
      "User profile fetched successfully",
    );
  } catch (error) {
    next(error);
  }
};
