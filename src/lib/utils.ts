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
    return { error: result.error.issues[0].message };
  }
  return result.data;
}
export function SafeParseJSON<T extends ZodRawShape>(
  schema: ZodObject<T>,
  data: unknown,
): ErrorMessage | z.infer<ZodObject<T>> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  return result.data;
}
export async function SafeParseRequest<T extends ZodRawShape>(
  schema: ZodObject<T>,
  request: Request,
): Promise<ErrorMessage | z.infer<ZodObject<T>>> {
  const contentType = request.headers.get("Content-Type") || "";
  let data: unknown;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    data = await parseFormData(formData);
  } else {
    data = await request.json();
  }

  const result = schema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
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

export async function parseFormData(
  formData: FormData,
): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.type === "application/json") {
      result[key] = JSON.parse(await value.text());
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function randomFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
