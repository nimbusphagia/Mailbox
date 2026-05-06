import { redirect } from "react-router-dom";
import api from "@/lib/api";
import { RegisterSchema } from "@/lib/schemas/auth.schema";
import type { ActionFunctionArgs } from "react-router-dom";
import type { ActionResult } from "@/lib/utils";
import { handleAxiosError, SafeParseForm } from "@/lib/utils";

export async function SignupAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult> {
  const data = await request.formData();
  const result = SafeParseForm(RegisterSchema, data);
  if ("error" in result) return result;
  const { confirmPassword, ...payload } = result;
  try {
    await api.post("/auth/signup", payload);
  } catch (err) {
    return handleAxiosError(err);
  }
  return redirect("/login?registered=true");
}
