import { BlogType } from "@makdoom/byte-common";
import getPrisma from "../db";
import { ValidationError } from "../utils/ApiError";

export const getAllBlogService = async () => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const allBlogs = await prisma.blogs.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            profileURL: true,
            username: true,
          },
        },
      },
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    return allBlogs;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const getDraftBlogsService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const draftBlogCount = await prisma.blogs.count({
      where: { authorId: id, isDraft: true },
    });

    // if draftBlofCount 0 create new draft blog other wise get all draft blogs
    let draftBlogs = null;
    if (draftBlogCount === 0) {
      draftBlogs = await prisma.blogs.create({
        data: {
          title: `Untitled-${draftBlogCount + 1}`,
          content: "",
          authorId: id,
        },
      });
    } else {
      draftBlogs = await prisma.blogs.findFirst({
        where: { isDraft: true },
      });
    }

    return draftBlogs;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const getAllDraftsService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const allBlogs = await prisma.blogs.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
    });

    return allBlogs;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const createNewDraftService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);

    const draftBlogCount = await prisma.blogs.count({
      where: { authorId: id, isDraft: true },
    });

    const newBlog = await prisma.blogs.create({
      data: {
        title: `Untitled-${draftBlogCount + 1}`,
        content: "",
        authorId: id,
      },
    });

    return newBlog;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const pinBlogService = async (body: {
  blogId: string;
  isPinned: boolean;
}) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const updatedBlog = await prisma.blogs.update({
      where: { id: body.blogId },
      data: { isPinned: body.isPinned },
    });
    return updatedBlog;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const deleteBlogService = async (body: { blogId: string }) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    await prisma.blogs.delete({ where: { id: body.blogId } });

    return true;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const publishBlogService = async (body: BlogType) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    await prisma.blogs.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        coverImage: body.coverImage,
        content: body.content,
        isPublished: body.isPublished,
        publishedAt: new Date(),
        isDraft: false,
        isPinned: false,
      },
    });

    return true;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const singleBlogService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const blog = await prisma.blogs.findFirst({
      where: { id, isPublished: true },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            profileURL: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return blog;
  } catch (error) {
    throw new ValidationError(error);
  }
};
