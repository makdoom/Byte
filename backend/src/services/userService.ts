import { UserToEditType } from "@makdoom/byte-common";
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

export const updateUserProfileService = async (
  data: UserToEditType,
  userId: string,
) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        profileTagline: data.profileTagline,
        coverImage: data.coverImage,
        profileURL: data.profileURL,
        bio: data.bio,
        location: data.location,
        techStack: data.techStack,
        socialLinks: {
          upsert: {
            create: {
              portfolio: data.socialLinks.portfolio,
              github: data.socialLinks.github,
              linkedin: data.socialLinks.linkedin,
              instagram: data.socialLinks.instagram,
              twitter: data.socialLinks.twitter,
              youtube: data.socialLinks.youtube,
            },
            update: {
              portfolio: data.socialLinks.portfolio,
              github: data.socialLinks.github,
              linkedin: data.socialLinks.linkedin,
              instagram: data.socialLinks.instagram,
              twitter: data.socialLinks.twitter,
              youtube: data.socialLinks.youtube,
            },
          },
        },
      },
      include: {
        blogs: true,
        socialLinks: true,
      },
    });
    delete updatedUser.password;
    return updatedUser;
  } catch (error) {
    throw new ValidationError(error);
  }
};
