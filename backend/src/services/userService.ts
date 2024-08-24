import getPrisma from "../db";
import { ValidationError } from "../utils/ApiError";

export const getUserProfileService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { socialLinks: true, blogs: { where: { isPublished: true } } },
    });
    if (!user) throw new ValidationError("No user found");
    delete user["password"];

    return user;
  } catch (error) {
    throw new ValidationError(error);
  }
};
