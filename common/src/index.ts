import { z, ZodType } from "zod";

const ResponseCreator = <T extends ZodType<unknown>>(ResponseDataSchema: T) => {
  return z.object({
    message: z.string(),
    statusCode: z.number(),
    data: ResponseDataSchema,
  });
};

// Authentication payload / response types
export const SigninReqSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export const SignupReqSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().min(1, "Email is required").email("Email is invalid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const SiginResData = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  accessToken: z.string(),
});

export const GetUserResData = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  isAuthorized: z.boolean(),
});

export const LogoutUserResSchema = z.object({
  data: z.null(),
  message: z.string(),
  statusCode: z.number(),
  success: z.boolean(),
});

export const SiginResSchema = ResponseCreator(SiginResData);
export type SigninReqType = z.infer<typeof SigninReqSchema>;
export type SiginResType = z.infer<typeof SiginResSchema>;

export const GetUserResSchema = ResponseCreator(GetUserResData);
export type GetUserResType = z.infer<typeof GetUserResSchema>;

export type LogoutUserResType = z.infer<typeof LogoutUserResSchema>;

// Blogs schema and types
export const BlogResData = z.object({
  id: z.string(),
  title: z.string().min(1, "Please provide some title"),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  isDraft: z.boolean(),
  isPinned: z.boolean(),
  isPublished: z.boolean(),
  authorId: z.string(),
});

export const BlogResSchema = ResponseCreator(BlogResData);
export type BlogType = z.infer<typeof BlogResData>;
export type BlogResType = z.infer<typeof BlogResSchema>;

export const EmptyDraftSchema = z.object({
  userId: z.string(),
});

export type EmptyDraftType = z.infer<typeof EmptyDraftSchema>;

export const AllBlogsResData = z.object({
  drafts: z.array(BlogResData).optional(),
  pinned: z.array(BlogResData).optional(),
  published: z.array(BlogResData).optional(),
});

export const AllBlogResSchema = ResponseCreator(AllBlogsResData);
export type AllBlogResType = z.infer<typeof AllBlogResSchema>;
export type BlogListType = z.infer<typeof AllBlogsResData>;
