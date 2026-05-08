import z from "zod";
import { SafeUserSchema } from "./user.schema";
import { UuidSchema } from "./util.schema";

export const HOME_INTENTS = [
  "getUsers",
  "getContacts",
  "createChat",
  "addContact",
] as const;

export const ActionSchema = z.object({
  intent: z.enum(HOME_INTENTS),
  userId: UuidSchema.optional(),
  contacts: SafeUserSchema.array().optional(),
});

export type Action = z.infer<typeof ActionSchema>;
export type Intent = z.infer<typeof ActionSchema>["intent"];
