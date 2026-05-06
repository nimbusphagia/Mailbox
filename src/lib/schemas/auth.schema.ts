import z from "zod";
import { PasswordSchema, UsernameSchema } from "./util.schema";

export const LoginSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    username: UsernameSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof RegisterSchema>;
