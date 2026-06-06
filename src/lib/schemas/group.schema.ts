import z from "zod";
import { UuidSchema } from "./util.schema";
import { ChatMemberSchema } from "./chat.schema";
import { ChatMessageSchema } from "./message.schema";

export const GroupReqSchema = z.object({
  id: UuidSchema.optional(),
  name: z.string().min(1),
  members: z.array(UuidSchema),
});

export type GroupReq = z.infer<typeof GroupReqSchema>;

export const GroupResSchema = z.object({
  id: UuidSchema,
  name: z.string().nullable(),
  imgUrl: z.url().nullable(),
  createdById: UuidSchema.nullable(),
  createdAt: z.date(),
  isGroup: z.boolean(),
  members: z.array(ChatMemberSchema),
  messages: z.array(ChatMessageSchema),
});

export type GroupRes = z.infer<typeof GroupResSchema>;

export const GroupLazySchema = z.object({
  id: UuidSchema,
  createdAt: z.coerce.date(),
  isGroup: z.boolean(),
  name: z.string().min(1),
  imgUrl: z.url().optional(),
  lastMessage: ChatMessageSchema.optional(),
});
export type GroupLazy = z.infer<typeof GroupLazySchema>;
