import { UuidSchema } from "./util.schema";
import z from "zod";

export const ChatLazySchema = z.object({
  id: UuidSchema,
  createdById: UuidSchema.nullable(),
  createdAt: z.date(),
  isGroup: z.boolean(),
});

export type ChatLazy = z.infer<typeof ChatLazySchema>;
