import { Router } from "express";
import {
  getUser,
  logoutUser,
  signinUser,
  signupUser,
} from "../controller/authController";
import { authenticateUser } from "../middlewares/authenticate";

const authRouter = Router();

authRouter.route("/signup").post(signupUser);
authRouter.route("/signin").post(signinUser);
authRouter.route("/get-user").get(authenticateUser, getUser);
authRouter.route("/logout").post(logoutUser);

export default authRouter;
