import { redirect } from "react-router-dom";
import api from "@/lib/api";
import { LoginSchema } from "@/lib/schemas/auth.schema";
import type { ActionFunctionArgs } from "react-router-dom";
import { handleAxiosError, SafeParseForm } from "@/lib/utils";
import { type ActionResult } from "@/lib/utils";

export async function LoginAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult> {
  const data = await request.formData();
  const result = SafeParseForm(LoginSchema, data);
  if ("error" in result) return result;
  try {
    await api.post("auth/login", result);
  } catch (err) {
    return handleAxiosError(err);
  }

  return redirect("/");
}
