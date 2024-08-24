import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticate";
import {
  getUserProfile,
  updateUserProfile,
} from "../controller/userController";

const userRouter = Router();

userRouter.route("/getUserProfile").post(authenticateUser, getUserProfile);
userRouter
  .route("/updateUserProfile")
  .post(authenticateUser, updateUserProfile);

export default userRouter;
