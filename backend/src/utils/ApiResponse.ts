import { Response } from "express";

interface SuccessResponse<T> {
  status: "success";
  data: T;
  message: string;
  statusCode: number;
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message: string = "Request was successful",
  statusCode: number = 200,
): Response => {
  const response: SuccessResponse<T> = {
    statusCode,
    status: "success",
    data,
    message,
  };

  return res.status(statusCode).json(response);
};
