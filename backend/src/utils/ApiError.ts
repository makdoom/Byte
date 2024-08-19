/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public data: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    data: any = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Validation Error", statusCode: number = 400) {
    super(message, statusCode);
  }
}

export const errorHandler = (
  err: ApiError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.error("Error:", err);

  if (!err.isOperational) {
    // Log the error, alert the team, etc.
    console.error("Unexpected Error:", err);
  }

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    stack: process.env.ENVIRONMENT === "development" ? err.stack : undefined,
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
