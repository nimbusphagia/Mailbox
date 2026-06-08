import z from "zod";
import { UuidSchema } from "./util.schema";
import { ChatMessageSchema } from "./message.schema";
import { SafeUserSchema } from "./user.schema";

export const GroupReqSchema = z.object({
  id: UuidSchema.optional(),
  name: z.string().min(1),
  members: z.array(UuidSchema),
});

export type GroupReq = z.infer<typeof GroupReqSchema>;

export const GroupResponseSchema = z.object({
  id: UuidSchema,
  name: z.string().min(1),
  imgUrl: z.url(),
  isGroup: z.boolean(),
  createdAt: z.date(),
  primaryMember: SafeUserSchema,
  secondaryMembers: z.array(
    SafeUserSchema.extend({ nickname: z.string().nullable() }),
  ),
  messages: z.array(ChatMessageSchema),
});

export type GroupRes = z.infer<typeof GroupResponseSchema>;

export const GroupLazySchema = z.object({
  id: UuidSchema,
  createdAt: z.coerce.date(),
  isGroup: z.boolean(),
  name: z.string().min(1),
  imgUrl: z.url().optional(),
  lastMessage: ChatMessageSchema.optional(),
});
export type GroupLazy = z.infer<typeof GroupLazySchema>;
