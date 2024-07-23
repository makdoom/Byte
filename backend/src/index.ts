import { Hono } from "hono";
import { Bindings, Variables } from "./types";
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";
import { HTTPException } from "hono/http-exception";
import { ErrorResponse } from "./utils/customResponse";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().basePath(
  "/api/v1"
);

// Middlewares
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Router
app.route("/auth", authRouter);
app.route("/post", postRouter);

// Custom HTTP Exception handler
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    const { statusCode, message, stack } = ErrorResponse(error);
    return c.json({
      statusCode,
      message,
      stack: c.env.ENVIORNMENT === "production" ? stack : "",
    });
  }

  return c.json({
    statusCode: 500,
    stack: "",
    message: "Internal server error",
  });
});

export default app;
