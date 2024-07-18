import { z } from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SignupInputType = z.infer<typeof signupInput>;
export type SigninInputType = z.infer<typeof signinInput>;

export type CreatePostInput = z.infer<typeof createPostInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
