import { Hono } from "hono";
import { Bindings } from "../types";
import { getPrisma } from "../config";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@makdoom/medium-common";

const authRouter = new Hono<{ Bindings: Bindings }>();

authRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invaid payload provided" });
  }

  if (!body.email) return c.json({ error: "Please enter a valid email" });
  if (!body.password) return c.json({ error: "Please enter a valid password" });

  try {
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
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      c.status(411);
      return c.json({ error: error.message });
    }
  }
});

authRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid payload provided" });
  }

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
});

authRouter.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const response = await prisma.user.findMany({});
  console.log(response);
  return c.json({ data: response });
});

export default authRouter;
