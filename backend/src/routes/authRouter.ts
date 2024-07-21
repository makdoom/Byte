import { Hono } from "hono";
import { signinInput, signupInput } from "@makdoom/medium-common";
import { sign } from "hono/jwt";

import { Bindings } from "../types";
import { getPrisma } from "../config";
import { HTTPException } from "hono/http-exception";
import { ApiResponse, ErrorResponse } from "../utils/customResponse";
import { checkIsPasswordMatched, encryptPassword } from "../utils";

const authRouter = new Hono<{ Bindings: Bindings }>();

authRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  if (!body.email)
    throw new HTTPException(411, { message: "Please enter a valid email" });
  if (!body.password)
    throw new HTTPException(411, { message: "Please enter a valid password" });

  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    let hashedPassword = await encryptPassword(body.password);
    let user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name ? body.name : "",
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token,
      ...ApiResponse(200, "User created successfully", user),
    });
  } catch (error) {
    return c.json(ErrorResponse(error));
  }
});

authRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    throw new HTTPException(411, { message: "Invalid payload provided" });
  }

  if (!body.email)
    throw new HTTPException(411, { message: "Please enter a valid email" });
  if (!body.password)
    throw new HTTPException(411, { message: "Please enter a valid password" });

  // const dcryptedPassword = await decryptPassword()
  const prisma = getPrisma(c.env.DATABASE_URL);
  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new HTTPException(411, {
      message: "No user found with the email id provided",
    });
  }

  const isPasswordMatched = await checkIsPasswordMatched(
    body.password,
    user.password
  );
  if (!isPasswordMatched)
    throw new HTTPException(411, {
      message: "Invalid password provided",
    });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    token,
    ...ApiResponse(200, "User login successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
    }),
  });
});

export default authRouter;
