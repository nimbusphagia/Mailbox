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
  createdAt: z.coerce.date(),
  isGroup: z.boolean(),
  otherMember: SafeUserSchema,
  lastMessage: ChatMessageSchema.optional(),
});
export type ChatLazy = z.infer<typeof ChatLazySchema>;
export const ChatSchema = z.object({
  id: UuidSchema,
  createdById: UuidSchema.nullable(),
  createdAt: z.coerce.date(),
  isGroup: z.boolean(),
  members: z.array(ChatMemberSchema),
  messages: z.array(ChatMessageSchema),
});

export type ChatType = z.infer<typeof ChatSchema>;
