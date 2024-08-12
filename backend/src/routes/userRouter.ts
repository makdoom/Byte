import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { getTokensFromCookie } from "../utils";
import { verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { extendContext, ExtendedContext } from "../utils/customResponses";
import { getPrisma } from "../config";

const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middlewares
userRouter.use("/*", async (c, next) => {
  let cookie = c.req.header("cookie");
  if (!cookie) {
    c.status(405);
    return c.json({ error: "Unauthorized user", statusCode: 405 });
  }

  const { accessToken, refreshToken } = getTokensFromCookie(cookie);
  if (!accessToken || !refreshToken) {
    c.status(405);
    return c.json({ error: "Unauthorized user", statusCode: 405 });
  }

  // Check access token is valid or not
  try {
    let { id } = await verify(accessToken, c.env.ACCESS_TOKEN_SECRET);
    if (typeof id == "string") {
      c.set("userId", id);
      await next();
    }
  } catch (error) {
    console.log(error);
    c.status(401);
    throw new HTTPException(401, { message: "Unauthorized user" });
  }
});

userRouter.get("/get-user", async (c) => {
  const { sendSuccess, status, get } = extendContext(c) as ExtendedContext;
  const userId = get("userId");

  if (!userId) {
    status(500);
    throw new HTTPException(500, { message: "Invalid payload provided" });
  }

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return sendSuccess(200, user, "User fetched successfully");
  } catch (error) {
    status(411);
    throw new HTTPException(411, {
      message: "Something went wrong while fetching user",
    });
  }
});

export default userRouter;
