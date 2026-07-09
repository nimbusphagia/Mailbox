import z from "zod";
import { ImageSchema, UuidSchema } from "./util.schema";
import { MessageCreateSchema } from "./message.schema";
import { GroupReqSchema } from "./group.schema";
import { ProfilePictureSchema } from "./assets.schema";

export const HOME_INTENTS = [
  "getMe",
  "getUsers",
  "getContacts",
  "createChat",
  "createGroup",
  "addContact",
  "toggleArchived",
  "getChat",
  "getGroup",
  "editGroup",
  "getContact",
  "removeGroupMember",
  "toggleBlocked",
  "createMessage",
  "editNickname",
  "logout",
] as const;

export const ActionSchema = z.object({
  intent: z.enum(HOME_INTENTS),
  userId: UuidSchema.optional(),
  memberId: UuidSchema.optional(),
  contactId: UuidSchema.optional(),
  contacts: UuidSchema.array().optional(),
  chatId: UuidSchema.optional(),
  groupId: UuidSchema.optional(),
  message: MessageCreateSchema.optional(),
  group: GroupReqSchema.optional(),
  nickname: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val))
    .optional(),
  image: ImageSchema.optional(),
  asset: ProfilePictureSchema.optional(),
});

export type Action = z.infer<typeof ActionSchema>;
export type Intent = z.infer<typeof ActionSchema>["intent"];
