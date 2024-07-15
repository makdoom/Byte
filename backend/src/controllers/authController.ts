import { Context } from "hono";
import { getPrisma } from "../config";

export const signup = async (c: Context) => {
  const body = await c.req.json();

  if (!body.email) return c.json({ error: "Please enter a valid email" });
  if (!body.password) return c.json({ error: "Please enter a valid password" });

  const prisma = getPrisma(c.env.DATABASE_URL);
  let response = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name ? body.name : "",
      password: body.password,
    },
  });

  return c.json({ msg: "Hello Hono from signup " });
};

export const signin = async (c: Context) => {
  return c.json({ msg: "Hello Hono from signin " });
};
