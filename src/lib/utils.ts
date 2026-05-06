import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ZodObject, ZodRawShape } from "zod";
import { isAxiosError } from "axios";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface ErrorMessage {
  error: string;
}
export function SafeParseForm<T extends ZodRawShape>(
  schema: ZodObject<T>,
  data: FormData,
): ErrorMessage | z.infer<ZodObject<T>> {
  const result = schema.safeParse(Object.fromEntries(data));
  if (!result.success) {
    return { error: "Error: " + result.error.issues[0].message };
  }
  return result.data;
}

export function handleAxiosError(err: unknown): { error: string } {
  if (isAxiosError(err)) {
    return {
      error: err.response?.data?.message ?? err.message,
    };
  }
  return { error: "Something went wrong. Please try again." };
}

export type ActionResult = ErrorMessage | Response;
