import { Router } from "express";
import {
  generateToken,
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
authRouter.route("/token").post(authenticateUser, generateToken);
authRouter.route("/logout").get(logoutUser);

export default authRouter;
