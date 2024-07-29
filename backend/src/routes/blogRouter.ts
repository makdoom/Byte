import { Hono } from "hono";
import { Bindings, Variables } from "../types";
// import { getPrisma } from "../config";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import { getTokensFromCookie } from "../utils";
import { extendContext, ExtendedContext } from "../utils/customResponses";
import { getPrisma } from "../config";
import { EmptyDraftSchema } from "@makdoom/byte-common";
// import { createBlogPayload } from "@makdoom/medium-common";

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
    return c.json({ error: "Something went wrong while creating draft blog" });
  }
});

// // Create Post
// blogRouter.post("/create-post", async (c) => {
//   const body = await c.req.json();
//   const authorId = c.get("userId");

//   const { success } = createBlogPayload.safeParse(body);
//   if (!success) {
//     c.status(411);
//     return c.json({ error: "Invalid payload provided" });
//   }

//   try {
//     const prisma = getPrisma(c.env.DATABASE_URL);
//     let createdPost = await prisma.post.create({
//       data: {
//         title: body.title,
//         content: body.content,
//         authorId: authorId,
//       },
//     });
//     return c.json({ success: 1, data: createdPost });
//   } catch (error) {
//     c.status(411);
//     return c.json({ error: "Something went wrong while creating post" });
//   }
// });

// // Update Post
// blogRouter.put("/update-post", async (c) => {
//   const body = await c.req.json();

//   let success = true;
//   // const { success } = updatePostInput.safeParse(body);
//   if (!success) {
//     c.status(411);
//     return c.json({ error: "Invalid payload provided" });
//   }

//   try {
//     const prisma = getPrisma(c.env.DATABASE_URL);
//     let updatedPost = await prisma.post.update({
//       where: {
//         id: body.id,
//       },
//       data: {
//         title: body.title,
//         content: body.content,
//       },
//     });
//     return c.json({ success: 1, data: updatedPost });
//   } catch (error) {
//     c.status(411);
//     return c.json({ error: "Something went wrong while creating post" });
//   }
// });

// // Get All Post
// blogRouter.get("/get-all-post", async (c) => {
//   try {
//     const prisma = getPrisma(c.env.DATABASE_URL);
//     const posts = await prisma.post.findMany({});
//     return c.json({ success: 1, data: posts });
//   } catch (error) {
//     c.status(411);
//     return c.json({ error: "Something went wrong while fethcing all posts" });
//   }
// });

// // Get Specific Post
// blogRouter.get("/:id", async (c) => {
//   const id = c.req.param("id");

//   try {
//     const prisma = getPrisma(c.env.DATABASE_URL);
//     const post = await prisma.post.findFirst({
//       where: { id },
//     });

//     return c.json({ success: 1, data: post });
//   } catch (error) {
//     c.status(411);
//     return c.json({ error: "Something went wrong while fetching post" });
//   }
// });

export default blogRouter;
