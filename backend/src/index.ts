import { Hono } from "hono";
import { Bindings, Variables } from "./types";
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().basePath(
  "/api/v1"
);

// Router
app.route("/auth", authRouter);
app.route("/post", postRouter);

export default app;
