import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  try {
    const rounds = 10;
    const saltRound = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    return hashedPassword;
  } catch (error) {
    throw new HTTPException(411, {
      message: "Something went wrong while data encryption",
    });
  }
};

export const checkIsPasswordMatched = async (
  userPassword: string,
  hashedPassword: string
) => {
  try {
    let isVerified = await bcrypt.compare(userPassword, hashedPassword);
    return isVerified;
  } catch (error) {
    throw new HTTPException(411, {
      message: "Something went wrong while user verification",
    });
  }
};
