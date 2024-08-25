import { NextFunction, Response } from "express";
import { CustomRequest } from "../utils";
import { sendSuccessResponse } from "../utils/ApiResponse";
import { ValidationError } from "../utils/ApiError";
import { cloudinaryUpload } from "../utils/uploadFile";

export const uploadImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) throw new ValidationError("No file uploaded");

    const response = await cloudinaryUpload(req.file.path, "coverImages");

    return sendSuccessResponse(
      res,
      {
        fileURL: response.secure_url,
        orgFileName: response.original_filename,
        fileExtension: response.original_extension,
        size: response.bytes,
        extension: response.format,
      },
      "Image uploaded successfully",
    );
  } catch (error) {
    next(error);
  }
};
