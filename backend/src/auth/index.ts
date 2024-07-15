import { Hono } from "hono";
import { signin, signup } from "../controllers/authController";

const auth = new Hono();

auth.post("/signup", signup);
auth.post("/signin", signin);

export default auth;
