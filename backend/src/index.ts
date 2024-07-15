import { Hono } from "hono";
import auth from "./auth";
import { getPrisma } from "./config";
import { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api/v1");

app.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  return c.text("Hello Hono");
});

// Auth Routes
app.route("/auth", auth);

export default app;
