import z from "zod";
import { UuidSchema } from "./util.schema";
import { MessageCreateSchema } from "./message.schema";

export const HOME_INTENTS = [
  "getUsers",
  "getContacts",
  "createChat",
  "addContact",
  "getChat",
  "getContact",
  "createMessage",
  "editNickname",
] as const;

export const ActionSchema = z.object({
  intent: z.enum(HOME_INTENTS),
  userId: UuidSchema.optional(),
  contactId: UuidSchema.optional(),
  contacts: UuidSchema.array().optional(),
  chatId: UuidSchema.optional(),
  message: MessageCreateSchema.optional(),
  nickname: z.string().optional(),
});

export type Action = z.infer<typeof ActionSchema>;
export type Intent = z.infer<typeof ActionSchema>["intent"];
