import { Context } from "hono";

export const signup = async (c: Context) => {
  return c.json({ msg: "Hello Hono from signup " });
};

export const signin = async (c: Context) => {
  return c.json({ msg: "Hello Hono from signin " });
};
