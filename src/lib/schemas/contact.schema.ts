import z from "zod";
import { UuidSchema } from "./util.schema";
import { SafeUserSchema } from "./user.schema";

export const ContactSchema = z.object({
  id: z.string(),
  ownerId: UuidSchema,
  user: SafeUserSchema.nullable(),
  userId: UuidSchema.nullable(),
  nickname: z.string().nullable(),
  isBlocked: z.boolean(),
});

export type ContactType = z.infer<typeof ContactSchema>;
