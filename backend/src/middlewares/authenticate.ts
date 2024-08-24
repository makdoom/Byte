import { JwtPayload, verify } from "jsonwebtoken";
import { ValidationError } from "../utils/ApiError";
import getPrisma from "../db";

export const authenticateUser = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization");

    if (!token) throw new ValidationError("Unauthorized reqest", 401);

    const decodedToken = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;

    const prisma = getPrisma(process.env.POOL_URL);
    const user = await prisma.user.findUnique({
      where: { id: decodedToken?.id },
    });
    if (!user) throw new ValidationError("User not found, Access denied");

    delete user["password"];
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
