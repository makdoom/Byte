import { Context } from "hono";
import { getPrisma } from "../config";
import { sign } from "hono/jwt";

export const signup = async (c: Context) => {
  const body = await c.req.json();

  if (!body.email) return c.json({ error: "Please enter a valid email" });
  if (!body.password) return c.json({ error: "Please enter a valid password" });

  const prisma = getPrisma(c.env.DATABASE_URL);
  let user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name ? body.name : "",
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ message: "User created successfully", token });
};

export const signin = async (c: Context) => {
  const body = await c.req.json();

  if (!body.email) return c.json({ error: "Please enter a valid email" });
  if (!body.password) return c.json({ error: "Please enter a valid password" });

  const prisma = getPrisma(c.env.DATABASE_URL);
  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid credential provided" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ msg: "User signin successfully ", token });
};
