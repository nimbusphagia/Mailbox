import z from "zod";
import { UuidSchema } from "./util.schema";

export const GroupReqSchema = z.object({
  id: UuidSchema.optional(),
  name: z.string().min(1),
  members: z.array(UuidSchema),
});

export type GroupReq = z.infer<typeof GroupReqSchema>;
