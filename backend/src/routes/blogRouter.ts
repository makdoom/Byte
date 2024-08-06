import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { getTokensFromCookie } from "../utils";
import { extendContext, ExtendedContext } from "../utils/customResponses";
import { getPrisma } from "../config";
import {
  BlogResData,
  BlogType,
  DeleteBlogPayload,
  DeleteBlogType,
  EmptyDraftSchema,
  PinBlogType,
} from "@makdoom/byte-common";

const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middlewares
blogRouter.use("/*", async (c, next) => {
  let cookie = c.req.header("cookie");
  if (!cookie) {
    c.status(405);
    return c.json({ error: "Unauthorized user", statusCode: 405 });
  }

  const { accessToken, refreshToken } = getTokensFromCookie(cookie);
  if (!accessToken || !refreshToken) {
    console.log("inside");
    c.status(405);
    return c.json({ error: "Unauthorized user", statusCode: 405 });
  }

  // Check access token is valid or not
  try {
    let { id } = await verify(accessToken, c.env.ACCESS_TOKEN_SECRET);
    if (typeof id == "string") {
      c.set("userId", id);
      await next();
    }
  } catch (error) {
    console.log(error);
    c.status(401);
    throw new HTTPException(401, { message: "Unauthorized user" });
  }
});

blogRouter.get("/", async (c) => {
  const { sendSuccess, status, get } = extendContext(c) as ExtendedContext;
  const userId = get("userId");

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const allBlogs = await prisma.blogs.findMany({
      include: {
        author: {
          select: { id: true, email: true, name: true, profileURL: true },
        },
      },
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(200, allBlogs, "Blogs fetched successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while fetching all blogs",
    });
  }
});

// Create draft blog
blogRouter.post("/create-draft", async (c) => {
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;
  const body = await req.json();

  const { success } = EmptyDraftSchema.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const draftBlogCount = await prisma.blogs.count({
      where: { isDraft: true },
    });

    if (draftBlogCount === 0) {
      const draftBlog = await prisma.blogs.create({
        data: {
          title: `Untitled-${draftBlogCount + 1}`,
          content: "",
          authorId: body.userId,
        },
      });

      return sendSuccess(200, draftBlog, "Draft blog created successfully");
    } else {
      const existingDraftBlog = await prisma.blogs.findFirst({
        where: { isDraft: true },
      });
      return sendSuccess(
        200,
        existingDraftBlog,
        "Draft blog fetched successfully"
      );
    }
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while creating draft blog",
    });
  }
});

// Create new blog as empty blog
blogRouter.post("/new", async (c) => {
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;
  const body = await req.json();

  const { success } = EmptyDraftSchema.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const draftBlogCount = await prisma.blogs.count({
      where: { isDraft: true },
    });

    const draftBlog = await prisma.blogs.create({
      data: {
        title: `Untitled-${draftBlogCount + 1}`,
        content: "",
        authorId: body.userId,
      },
    });

    return sendSuccess(200, draftBlog, "Draft blog created successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while creating draft blog",
    });
  }
});

blogRouter.post("/delete-blog", async (c) => {
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;
  const body: DeleteBlogType = await req.json();

  const { success } = DeleteBlogPayload.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    await prisma.blogs.delete({ where: { id: body.blogId } });
    return sendSuccess(200, null, "Blog deleted successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while deleting blog",
    });
  }
});

blogRouter.post("/pin-blog", async (c) => {
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;
  const body: PinBlogType = await req.json();

  const { success } = DeleteBlogPayload.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const updatedBlog = await prisma.blogs.update({
      where: { id: body.blogId },
      data: { isPinned: body.isPinned },
    });
    return sendSuccess(200, updatedBlog, "Blog updated successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while updating blog",
    });
  }
});

blogRouter.get("/drafts", async (c) => {
  const { sendSuccess, status, get } = extendContext(c) as ExtendedContext;
  const userId = get("userId");

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const allBlogs = await prisma.blogs.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(200, allBlogs, "Blogs fetched successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while fetching all blogs",
    });
  }
});

blogRouter.post("/publish", async (c) => {
  const { sendSuccess, status, req } = extendContext(c) as ExtendedContext;
  const body: BlogType = await req.json();

  const { success } = BlogResData.safeParse(body);
  if (!success) {
    status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    await prisma.blogs.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        coverImage: body.coverImage,
        content: body.content,
        isPublished: body.isPublished,
        isDraft: false,
        isPinned: false,
      },
    });
    return sendSuccess(200, null, "Blog updated successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while updating blog",
    });
  }
});

export default blogRouter;
