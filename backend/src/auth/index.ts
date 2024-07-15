import { Hono } from "hono";
import { signin, signup } from "../controllers/authController";
import { Bindings } from "../types";

const auth = new Hono<{ Bindings: Bindings }>();

auth.post("/signup", signup);
auth.post("/signin", signin);

export default auth;
