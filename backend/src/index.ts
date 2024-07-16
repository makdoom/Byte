import { Hono } from "hono";
import auth from "./auth";
import { Bindings } from "./types";
import { verify } from "hono/jwt";
import blogs from "./blogs";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api/v1");

// Middlewares
app.use("/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  console.log("header", header);
  if (!header) return c.json({ error: "Unauthorized user" });
  const tokenResponse = await verify(header, c.env.JWT_SECRET);
  if (tokenResponse.id) {
    await next();
  } else {
    c.status(401);
    return c.json({ error: "Unauthorized user" });
  }
});

// Auth Routes
app.route("/auth", auth);
app.route("/blog", blogs);

export default app;
