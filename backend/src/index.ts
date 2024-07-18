import { Hono } from "hono";
import { Bindings } from "./types";
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api/v1");

// Router
app.route("/auth", authRouter);
app.route("/post", postRouter);

export default app;
