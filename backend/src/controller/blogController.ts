import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/ApiResponse";
import {
  createNewDraftService,
  deleteBlogService,
  getAllBlogService,
  getAllDraftsService,
  getDraftBlogsService,
  pinBlogService,
  publishBlogService,
  singleBlogService,
} from "../services/blogService";
import { CustomRequest } from "../utils";
import {
  BlogResData,
  DeleteBlogPayload,
  EmptyDraftSchema,
} from "@makdoom/byte-common";
import { ValidationError } from "../utils/ApiError";

export const getAllBlogs = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allBlogs = await getAllBlogService();

    return sendSuccessResponse(res, allBlogs, "Blogs fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const createDraft = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { success } = EmptyDraftSchema.safeParse(body);
    if (!success) throw new ValidationError("Invalid paylod provided");

    const draftBlogs = await getDraftBlogsService(req.user.id);

    return sendSuccessResponse(
      res,
      draftBlogs,
      "Drafts blog fetched successfully",
    );
  } catch (error) {
    next(error);
  }
};

export const getAllDrafts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allBlogs = await getAllDraftsService(req.user?.id);
    return sendSuccessResponse(res, allBlogs, "Blogs fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const createNewDraft = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { success } = EmptyDraftSchema.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    const newDraft = await createNewDraftService(req.user?.id);
    return sendSuccessResponse(res, newDraft, "New blog created successfully");
  } catch (error) {
    next(error);
  }
};

export const getSingleBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new ValidationError("Invalid data provided");

    const blog = await singleBlogService(blogId);
    if (!blog) {
      throw new ValidationError("Invalid blog id provided");
    }
    return sendSuccessResponse(res, blog, "Fetched blog successfully");
  } catch (error) {
    next(error);
  }
};

export const pinBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { success } = DeleteBlogPayload.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    const newDraft = await pinBlogService(body);
    return sendSuccessResponse(res, newDraft, "Blog pinned successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { success } = DeleteBlogPayload.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    await deleteBlogService(body);
    return sendSuccessResponse(res, null, "Blog deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const publishBlog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { success } = BlogResData.safeParse(body);
    if (!success) throw new ValidationError("Invalid payload provided");

    await publishBlogService(body);
    return sendSuccessResponse(res, null, "Blog published successfully");
  } catch (error) {
    next(error);
  }
};
