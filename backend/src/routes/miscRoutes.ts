import { Router } from "express";
import { uploadImage } from "../controller/miscController";
import { uploadWithMulter } from "../middlewares/multer";
import { authenticateUser } from "../middlewares/authenticate";

const miscRouter = Router();

miscRouter
  .route("/uploadImage")
  .post(authenticateUser, uploadWithMulter.single("image"), uploadImage);

export default miscRouter;
