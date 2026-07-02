import { SafeUserSchema, ChatUserSchema } from "./user.schema";
import { UuidSchema } from "./util.schema";
import { ChatMessageSchema } from "./message.schema";
import z from "zod";

export const ChatLazySchema = z.object({
  id: UuidSchema,
  createdAt: z.coerce.date(),
  isGroup: z.boolean(),
  isArchived: z.boolean(),
  otherMember: ChatUserSchema,
  lastMessage: ChatMessageSchema.optional(),
});
export type ChatLazy = z.infer<typeof ChatLazySchema>;

export const ChatSchema = z.object({
  id: UuidSchema,
  isGroup: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.coerce.date(),
  primaryMember: SafeUserSchema,
  secondaryMember: ChatUserSchema,
  messages: z.array(ChatMessageSchema),
});

export type ChatRes = z.infer<typeof ChatSchema>;
