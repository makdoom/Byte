import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticate";
import { getUserProfile } from "../controller/userController";

const userRouter = Router();

userRouter.route("/getUserProfile").post(authenticateUser, getUserProfile);

export default userRouter;
