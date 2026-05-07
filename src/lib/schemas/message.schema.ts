import { UuidSchema } from "./util.schema";
import z from "zod";

export const ChatMessageSchema = z.object({
  id: UuidSchema,
  chatId: UuidSchema,
  senderId: UuidSchema.nullable(),
  content: z.string().nullable(),
  type: z.enum(["TEXT", "IMAGE", "SYSTEM_EVENT"]),
  metadata: z.json(),
  createdAt: z.date(),
  replyToId: UuidSchema.nullable(),
});

export type Message = z.infer<typeof ChatMessageSchema>;
