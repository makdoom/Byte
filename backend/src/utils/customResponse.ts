import { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const getPrismaErrorMessage = (err: any) => {
  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return `The ${err.meta.target} is already in use`;
    case "P2014":
      // handling invalid id errors
      return `Invalid ID: ${err.meta.target}`;
    case "P2003":
      // handling invalid data errors
      return `Invalid input data: ${err.meta.target}`;
    default:
      // handling all other errors
      return `Something went wrong: ${err.message}`;
  }
};

export const ErrorResponse = (error: any) => {
  let statusCode = 400;
  let message = getPrismaErrorMessage(error);
  let stack = "";

  if (error instanceof HTTPException) {
    statusCode = error.status;
    message = error.message;
    stack = error.stack || "";
  }

  return { statusCode, message, stack };
};

export const ApiResponse = (
  statusCode: number,
  message: string,
  data: unknown
) => ({ statusCode, message, data });
