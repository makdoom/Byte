import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NotFoundError } from "../utils/ApiError";

const getPrisma = (databaseURL: string) => {
  if (!databaseURL) throw new NotFoundError("Pool config not found");

  const prisma = new PrismaClient({
    datasourceUrl: databaseURL,
  }).$extends(withAccelerate());

  return prisma;
};

export default getPrisma;
