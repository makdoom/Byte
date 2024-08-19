import { Router } from "express";
import {
  createDraft,
  createNewDraft,
  deleteBlog,
  getAllBlogs,
  getAllDrafts,
  getSingleBlog,
  pinBlog,
  publishBlog,
} from "../controller/blogController";
import { authenticateUser } from "../middlewares/authenticate";

const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs);
blogRouter.route("/create-draft").post(authenticateUser, createDraft);
blogRouter.route("/drafts").get(authenticateUser, getAllDrafts);
blogRouter.route("/new").post(authenticateUser, createNewDraft);
blogRouter.route("/:username/:blogId").get(authenticateUser, getSingleBlog);
blogRouter.route("/pin-blog").post(authenticateUser, pinBlog);
blogRouter.route("/delete-blog").post(authenticateUser, deleteBlog);
blogRouter.route("/publish").post(authenticateUser, publishBlog);

export default blogRouter;
