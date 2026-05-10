import z from "zod";
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
  contacts: UuidSchema.array().optional(),
});

export type Action = z.infer<typeof ActionSchema>;
export type Intent = z.infer<typeof ActionSchema>["intent"];
