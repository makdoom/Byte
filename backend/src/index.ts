import { Hono } from "hono";
import auth from "./auth";

const app = new Hono().basePath("/api/v1");

// Auth Routes
app.route("/auth", auth);

export default app;
