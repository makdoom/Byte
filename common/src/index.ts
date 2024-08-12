import { z, ZodType } from "zod";

const ResponseCreator = <T extends ZodType<unknown> | null>(
  ResponseDataSchema: T
) => {
  return z.object({
    message: z.string(),
    statusCode: z.number(),
    data: ResponseDataSchema ? ResponseDataSchema : z.null(),
  });
};

// Authentication payload / response types
export const SigninReqSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignupResData = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  profileURL: z.string(),
  username: z.string(),
  accessToken: z.string(),
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

export const SignupResSchema = ResponseCreator(SignupResData);
export type SignupReqType = z.infer<typeof SignupReqSchema>;
export type SignupResType = z.infer<typeof SignupResSchema>;

export const SiginResData = SignupResData;

export const GetUserResData = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
  profileURL: z.string(),
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
  authorId: z.string(),
  title: z.string().min(1, "Please provide some title"),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  isDraft: z.boolean(),
  isPinned: z.boolean(),
  isPublished: z.boolean(),
  publishedAt: z.nullable(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BlogResSchema = ResponseCreator(BlogResData);
export type BlogType = z.infer<typeof BlogResData>;
export type BlogResType = z.infer<typeof BlogResSchema>;

export const EmptyDraftSchema = z.object({
  userId: z.string(),
});

export type EmptyDraftType = z.infer<typeof EmptyDraftSchema>;

export const AllBlogsResData = z.array(BlogResData).optional();

export const AllBlogResSchema = ResponseCreator(AllBlogsResData);
export type AllBlogResType = z.infer<typeof AllBlogResSchema>;
export type BlogListType = z.infer<typeof AllBlogsResData>;

export const DeleteBlogPayload = z.object({
  blogId: z.string().min(1, "Blog id is required"),
});

export const DeleteBlogResSchema = ResponseCreator(null);
export type DeleteBlogResType = z.infer<typeof DeleteBlogResSchema>;
export type DeleteBlogType = z.infer<typeof DeleteBlogPayload>;

export const PinBlogPayload = DeleteBlogPayload.extend({
  isPinned: z.boolean(),
});
export const PinBlogResSchema = ResponseCreator(BlogResData);
export type PinBlogResType = z.infer<typeof PinBlogResSchema>;
export type PinBlogType = z.infer<typeof PinBlogPayload>;

export const PublishedBlogResSchema = DeleteBlogResSchema;
export type PublishedBlogResType = z.infer<typeof PublishedBlogResSchema>;

export const Author = GetUserResData.omit({ isAuthorized: true });

const PublishedBlogSchema = BlogResData.extend({
  author: Author,
});

export const SinglePublishedBlog = ResponseCreator(PublishedBlogSchema);
export const PublishedBlogResData = z.array(PublishedBlogSchema);

export const AllPublishedBlogResSchema = ResponseCreator(PublishedBlogResData);
export type AllPublishedBlogResType = z.infer<typeof AllPublishedBlogResSchema>;
export type PublishedBlogType = z.infer<typeof PublishedBlogSchema>;
export type SinglePublishedBlogType = z.infer<typeof SinglePublishedBlog>;

export const SocialLinkSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  portfolio: z.string(),
  github: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
  youtube: z.string(),
  twitter: z.string(),
});
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  name: z.string(),
  coverImage: z.string(),
  location: z.string(),
  profileTagline: z.string(),
  bio: z.string(),
  techStack: z.string(),
  profileURL: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  socialLinks: SocialLinkSchema,
});

export const UserProfileRes = ResponseCreator(UserProfileSchema);
export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserProfileResTpe = z.infer<typeof UserProfileRes>;
