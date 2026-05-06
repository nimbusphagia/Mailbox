import { redirect } from "react-router-dom";
import api from "@/lib/api";
import { RegisterSchema } from "@/lib/schemas/auth.schema";
import type { ActionFunctionArgs } from "react-router-dom";

export type SignupActionResult = { error: string } | Response;

export async function SignupAction({
  request,
}: ActionFunctionArgs): Promise<SignupActionResult> {
  const data = await request.formData();
  const result = RegisterSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    return { error: "Error: " + result.error.issues[0].message };
  }

  const { confirmPassword, ...payload } = result.data;
  await api.post("/auth/signup", payload);
  return redirect("/login?registered=true");
}
