import { z, ZodType } from "zod";

// Define a base profile schema
// const baseProfileSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
// });

// // Define a function that takes a profile schema and returns a user schema
// const createUserSchema = <T extends ZodType<unknown>>(profileSchema: T) => {
//   return z.object({
//     id: z.string(),
//     profile: profileSchema,
//   });
// };

// // Define different profile schemas
// const detailedProfileSchema = baseProfileSchema.extend({
//   details: z.object({
//     age: z.number(),
//     email: z.string().email(),
//   }),
// });

// const simpleProfileSchema = baseProfileSchema.extend({
//   nickname: z.string(),
// });

// // Create user schemas with different profile schemas
// const detailedUserSchema = createUserSchema(detailedProfileSchema);
// const simpleUserSchema = createUserSchema(simpleProfileSchema);

// // Example usage
// const validDetailedUserData = {
//   id: "123",
//   profile: {
//     firstName: "Jane",
//     lastName: "Doe",
//     details: {
//       age: 30,
//       email: "jane.doe@example.com",
//     },
//   },
// };

// const validSimpleUserData = {
//   id: "456",
//   profile: {
//     firstName: "John",
//     lastName: "Smith",
//     nickname: "Johnny",
//   },
// };

// try {
//   const parsedDetailedUserData = detailedUserSchema.parse(validDetailedUserData); // Succeeds
//   console.log(parsedDetailedUserData);

//   const parsedSimpleUserData = simpleUserSchema.parse(validSimpleUserData); // Succeeds
//   console.log(parsedSimpleUserData);
// } catch (e) {
//   console.error(e);
// }

// const BaseResponseSchema = z.object({
//     success: z.number(),
//     message: z.string(),
//     statusCode: z.number()
// })

const createResponseSchema = <T extends ZodType<unknown>>(ResSchema: T) => {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    statusCode: z.number(),
    data: ResSchema,
  });
};

const siginResSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  accessToken: z.string(),
});

const ResponseSchemaF = createResponseSchema(siginResSchema);

const ResponseType = {
  success: true,
  message: "success",
  statusCode: 200,
  data: {
    id: "test",
    name: "makdoom",
    email: "makshiakh00@",
    accessToken: "ashjkasdf",
  },
};

const parsedDetailedUserData = ResponseSchemaF.parse(ResponseType); // Succeeds
console.log(parsedDetailedUserData);
