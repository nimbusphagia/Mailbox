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
export function SafeParseJSON<T extends ZodRawShape>(
  schema: ZodObject<T>,
  data: unknown,
): ErrorMessage | z.infer<ZodObject<T>> {
  const result = schema.safeParse(data);
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

export function timeAgo(date: Date): string {
  date.getTime();
  const diffMs = date.getTime() - Date.now();
  const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: "day", ms: 1000 * 60 * 60 * 24 },
    { unit: "hour", ms: 1000 * 60 * 60 },
    { unit: "minute", ms: 1000 * 60 },
    { unit: "second", ms: 1000 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const { unit, ms } of units) {
    if (Math.abs(diffMs) >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return "just now";
}
export function formatDate(date: Date, format?: "short" | "long") {
  if (format === "long") {
    return date.toLocaleString(undefined, {
      timeStyle: "short",
      dateStyle: "long",
    });
  }
  return date.toLocaleString(undefined, {
    timeStyle: "short",
    dateStyle: "short",
  });
}
export const trimSentence = (str: string, num: number) =>
  str.split(" ").slice(0, num).join(" ");
