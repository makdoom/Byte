import { HTTPException } from "hono/http-exception";

export const ErrorResponse = (error: unknown) => {
  let statusCode = 500;
  let message = "";
  let stack = "";

  if (error instanceof Error) {
    statusCode = 411;
    message = error.message;
    stack = error.stack || "";
  } else if (error instanceof HTTPException) {
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
