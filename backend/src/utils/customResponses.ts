import { Context } from "hono";
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

export interface ExtendedContext extends Context {
  sendSuccess: (statusCode: number, data: any, message?: string) => Response;
}

export const extendContext = (c: Context): ExtendedContext => {
  const extendedContext = c as ExtendedContext;
  extendedContext.sendSuccess = (
    statusCode: number,
    data: any,
    message: string = "Operation successful"
  ) => {
    return c.json({
      statusCode,
      success: statusCode === 200,
      message,
      data,
    });
  };
  return extendedContext;
};

export const commonResponseHandler = async (c: Context, next: Function) => {
  const extendedContext = extendContext(c);
  await next(extendedContext);
};
