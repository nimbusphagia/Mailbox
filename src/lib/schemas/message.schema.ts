import { NullableJsonValueSchema, UuidSchema } from "./util.schema";
import z from "zod";

export const MessageTypeSchema = z.enum(["TEXT", "IMAGE", "SYSTEM_EVENT"]);
export type MessageType = z.infer<typeof MessageTypeSchema>;

export const ChatMessageSchema = z.object({
  id: UuidSchema,
  chatId: UuidSchema,
  senderId: UuidSchema.nullable(),
  content: z.string().nullable(),
  type: MessageTypeSchema,
  metadata: NullableJsonValueSchema,
  createdAt: z.coerce.date(),
  replyToId: UuidSchema.nullable(),
  isRead: z.boolean(),
});

export type Message = z.infer<typeof ChatMessageSchema>;

const TextMessageSchema = z.object({
  chatId: UuidSchema,
  type: z.literal("TEXT"),
  content: z.string().min(1),
  replyToId: UuidSchema.nullable().optional(),
});

const ImageMessageSchema = z.object({
  chatId: UuidSchema,
  type: z.literal("IMAGE"),
  content: z.string().optional(),
  metadata: NullableJsonValueSchema.nullable(),
  replyToId: UuidSchema.nullable().optional(),
});

export const MessageCreateSchema = z.discriminatedUnion("type", [
  TextMessageSchema,
  ImageMessageSchema,
]);

export type MessageCreate = z.infer<typeof MessageCreateSchema>;
