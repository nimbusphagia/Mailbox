import { SafeUserSchema } from "./user.schema";
import { UuidSchema } from "./util.schema";
import { ChatMessageSchema } from "./message.schema";
import z from "zod";

export const ChatMemberSchema = z.object({
  id: UuidSchema,
  chatId: UuidSchema,
  user: SafeUserSchema.nullable(),
  userId: UuidSchema.nullable(),
  role: z.enum(["MEMBER", "ADMIN", "OWNER"]),
});

export type ChatMember = z.infer<typeof ChatMemberSchema>;

export const ChatLazySchema = z.object({
  id: UuidSchema,
  createdAt: z.date(),
  isGroup: z.boolean(),
  otherMember: ChatMemberSchema,
  lastMessage: ChatMessageSchema.optional(),
});
export type ChatLazy = z.infer<typeof ChatLazySchema>;
