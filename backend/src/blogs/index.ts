import { Hono } from "hono";
import { Bindings } from "../types";
import { getPrisma } from "../config";
import { sign } from "hono/jwt";

const blogs = new Hono<{ Bindings: Bindings }>();

blogs.post("/", async (c) => {
  return c.json({ success: 1, data: [] });
});

export default blogs;
