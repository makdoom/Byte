import { SignupReqType } from "@makdoom/byte-common";
import getPrisma from "../db";
import {
  checkIsPasswordMatched,
  encryptPassword,
  generateUsername,
} from "../utils";
import { ValidationError } from "../utils/ApiError";

export const signupService = async (data: SignupReqType) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) throw new ValidationError("Email id already exists");

    const hashedPassword = await encryptPassword(data.password);
    const username = generateUsername(data.email);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: username,
        name: data.name ? data.name : "",
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        profileURL: true,
      },
    });

    return user;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const signinUserService = async (data: SignupReqType) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new ValidationError("No user found with this email id");

    const isPasswordMatched = await checkIsPasswordMatched(
      data.password,
      user.password,
    );

    if (!isPasswordMatched) throw new ValidationError("Password doesn't match");

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileURL: user.profileURL,
    };
    return userResponse;
  } catch (error) {
    throw new ValidationError(error);
  }
};

export const getUserService = async (id: string) => {
  try {
    const prisma = getPrisma(process.env.POOL_URL);

    const user = await prisma.user.findUnique({
      where: { id },
      include: { socialLinks: true, posts: { where: { isPublished: true } } },
    });

    return user;
  } catch (error) {
    throw new ValidationError(error);
  }
};
