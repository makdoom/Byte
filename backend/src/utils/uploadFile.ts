import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log(error);
    unlinkSync(localFilePath);
    return null;
  }
};
