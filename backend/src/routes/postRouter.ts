import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { verify } from "hono/jwt";
import { getPrisma } from "../config";
import { createPostInput, updatePostInput } from "@makdoom/medium-common";

const postRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middlewares
postRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  if (!header) return c.json({ error: "Unauthorized user" });

  const user = await verify(header, c.env.JWT_SECRET);
  if (user.id) {
    c.set("userId", user.id.toString());
    await next();
  } else {
    c.status(401);
    return c.json({ error: "Unauthorized user" });
  }
});

// Create Post
postRouter.post("/create-post", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");

  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    let createdPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
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

  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid payload provided" });
  }

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

// Get All Post
postRouter.get("/get-all-post", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const posts = await prisma.post.findMany({});
    return c.json({ success: 1, data: posts });
  } catch (error) {
    c.status(411);
    return c.json({ error: "Something went wrong while fethcing all posts" });
  }
});

// Get Specific Post
postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const post = await prisma.post.findFirst({
      where: { id },
    });

    return c.json({ success: 1, data: post });
  } catch (error) {
    c.status(411);
    return c.json({ error: "Something went wrong while fetching post" });
  }
});

export default postRouter;
