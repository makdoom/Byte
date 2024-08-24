import { z } from "zod";

export const UserToEditSchema = z.object({
  name: z.string(),
  email: z.string(),
  profileTagline: z.string(),
  location: z.string(),
  coverImage: z.string(),
  profileURL: z.string(),
  techStack: z.string(),
  bio: z.string(),
  socialLinks: z.object({
    portfolio: z.string(),
    github: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    twitter: z.string(),
    youtube: z.string(),
  }),
});

export type UserToEditType = z.infer<typeof UserToEditSchema>;

// type SocialLinkType = {
//   portfolio: string;
//   github: string;
//   linkedin: string;
//   instagram: string;
//   twitter: string;
//   youtube: string;
// };

// export type UserToEditType = {
//   name: string;
//   email: string;
//   profileTagline: string;
//   location: string;
//   coverImage: string;
//   profileURL: string;
//   techStack: string;
//   bio: string;
//   socialLinks: SocialLinkType;
// };
