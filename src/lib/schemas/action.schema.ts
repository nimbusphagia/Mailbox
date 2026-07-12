import z from "zod";
import { ImageSchema, UuidSchema } from "./util.schema";
import { MessageCreateSchema } from "./message.schema";
import { GroupReqSchema } from "./group.schema";
import { ProfilePictureSchema } from "./assets.schema";
import { SafeUserSchema } from "./user.schema";
import { PasswordChangeSchema } from "./auth.schema";

export const HOME_INTENTS = [
  "getMe",
  "editProfile",
  "getUsers",
  "getContacts",
  "createChat",
  "createGroup",
  "addContact",
  "toggleArchived",
  "getChat",
  "getGroup",
  "editGroup",
  "deleteGroup",
  "getContact",
  "removeGroupMember",
  "leaveGroup",
  "toggleBlocked",
  "createMessage",
  "editNickname",
  "getBlockedContacts",
  "changePassword",
  "logout",
] as const;

export const ActionSchema = z.object({
  intent: z.enum(HOME_INTENTS),
  user: SafeUserSchema.optional(),
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
  changePassword: PasswordChangeSchema.optional(),
});

export type Action = z.infer<typeof ActionSchema>;
export type Intent = z.infer<typeof ActionSchema>["intent"];
