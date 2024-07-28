import { boolean, z, ZodType } from "zod";

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

export const SignupResSchema = ResponseCreator(SiginResData);
export type SignupReqType = z.infer<typeof SignupReqSchema>;
export type SignupResType = z.infer<typeof SignupResSchema>;

export const SiginResSchema = ResponseCreator(SiginResData);
export type SigninReqType = z.infer<typeof SigninReqSchema>;
export type SiginResType = z.infer<typeof SiginResSchema>;

export const GetUserResSchema = ResponseCreator(GetUserResData);
export type GetUserResType = z.infer<typeof GetUserResSchema>;

export type LogoutUserResType = z.infer<typeof LogoutUserResSchema>;

// Blogs schema and types
// const ResponseCreator = <T extends ZodType<unknown>>(ResponseDataSchema: T) => {
//   return z.object({
//     success: z.boolean(),
//     message: z.string(),
//     statusCode: z.number(),
//     data: ResponseDataSchema,
//   });
// };

// // Authentication payload / response types
// export const SigninReqSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Email is invalid"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// export type SigninReqType = z.infer<typeof SigninReqSchema>;

// export const SiginResData = z.object({
//   id: z.string(),
//   name: z.string(),
//   email: z.string(),
//   accessToken: z.string().optional(),
// });

// export const SiginResSchema = ResponseCreator(SiginResData);

// // export const signupPayload = z
// //   .object({
// //     name: z.string().optional(),
// //     email: z.string().min(1, "Email is required").email("Email is invalid"),
// //     password: z.string().min(8, "Password must be at least 8 characters long"),
// //     confirmPassword: z
// //       .string()
// //       .min(8, "Confirm Password must be at least 8 characters long"),
// //   })
// //   .refine((data) => data.password === data.confirmPassword, {
// //     path: ["confirmPassword"],
// //     message: "Passwords does not match",
// //   });

// // export const signupResponse = z.object({
// //   id: z.string(),
// //   name: z.string(),
// //   email: z.string(),
// //   accessToken: z.string().optional(),
// // });

// // export type SignupPayloadType = z.infer<typeof signupPayload>;
// // export type SignupResponseType = Response<z.infer<typeof signupResponse>>;

// // export const signinPayload = z.object({
// //   email: z.string().min(1, "Email is required").email("Email is invalid"),
// //   password: z.string().min(8, "Password must be at least 8 characters long"),
// // });

// // export const signinResponseSchema = signupResponse;

// // export type SigninPayloadType = z.infer<typeof signinPayload>;
// // export type SigninResponseType = Response<z.infer<typeof signinResponseSchema>>;

// // // Create Blog payload / Response
// // export const createBlogPayload = z.object({
// //   title: z.string(),
// //   content: z.string(),
// // });

// // export const createBlogResponse = z.object({
// //   id: z.string(),
// //   title: z.string(),
// //   content: z.string(),
// //   isPublished: z.string(),
// //   authorId: z.string(),
// // });

// // export const updateBlogPayload = z.object({
// //   title: z.string().optional(),
// //   content: z.string().optional(),
// //   id: z.string(),
// // });

// // export type createBlogPayloadType = z.infer<typeof createBlogPayload>;
// // export type createBlogResponseType = Response<
// //   z.infer<typeof createBlogResponse>
// // >;
