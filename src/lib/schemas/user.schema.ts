import z from "zod";
import { UuidSchema, UsernameSchema } from "./util.schema";

export const UserSchema = z.object({
  id: UuidSchema,
  username: UsernameSchema,
  passwordHash: z.string(),
  name: z.string(),
  imgUrl: z.url().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const SafeUserSchema = UserSchema.omit({
  passwordHash: true,
});
export type SafeUser = z.infer<typeof SafeUserSchema>;
