import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import getPrisma from "./db";
import { errorHandler } from "./utils/ApiError";
import { sendSuccessResponse } from "./utils/ApiResponse";
import authRouter from "./routes/authRoutes";
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";
import { uploadWithMulter } from "./middlewares/multer";
import miscRouter from "./routes/miscRoutes";

const app = express();

dotenv.config();

// Middlewares
app.use(cors({ origin: process.env.CROSS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", async (_, res, next) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const count = await prisma.blogs.count();
    sendSuccessResponse(res, { count }, "Hello Typescript ! 🚀");
  } catch (error) {
    next(error);
  }
});

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/misc", miscRouter);

app.post("/upload", uploadWithMulter.single("image"), (req, res) => {
  try {
    // After the file is uploaded to Cloudinary, the file information will be available in req.file
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    res.status(200).json({
      message: "File uploaded successfully!",
      file: req.file, // This contains the Cloudinary file details, like the URL
    });
  } catch (error) {
    res.status(500).json({
      success: 1,
      error,
    });
  }
});

app.use(errorHandler);

export default app;
