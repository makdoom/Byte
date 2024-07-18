import { Hono } from "hono";
import { Bindings } from "../types";
import { verify } from "hono/jwt";
import { getPrisma } from "../config";

const postRouter = new Hono<{ Bindings: Bindings }>();

// Middlewares
postRouter.use("/*", async (c, next) => {
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

// Create Post
postRouter.post("/create-post", async (c) => {
  const body = await c.req.json();
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    let createdPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: "1",
      },
    });
    return c.json({ success: 1, data: createdPost });
  } catch (error) {
    c.status(411);
    return c.json({ error: "Something went wrong while creating post" });
  }
});

// Update Post
postRouter.put("/update-post", async (c) => {
  const body = await c.req.json();
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    let updatedPost = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ success: 1, data: updatedPost });
  } catch (error) {
    c.status(411);
    return c.json({ error: "Something went wrong while creating post" });
  }
});

export default postRouter;
