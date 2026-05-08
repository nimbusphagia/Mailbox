import api from "@/lib/api";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ActionSchema } from "@/lib/schemas/util.schema";
import {
  handleAxiosError,
  SafeParseForm,
  type ErrorMessage,
} from "@/lib/utils";
import type { AxiosResponse } from "axios";
import type { ActionFunctionArgs } from "react-router-dom";

export type ActionReturn =
  | { intent: "getContacts"; data: Contact[] }
  | { intent: "getUsers"; data: { users: SafeUser[]; contacts: Contact[] } }
  | { intent: "addContact"; data: { users: SafeUser[]; contacts: Contact[] } };

export async function HomeAction({
  request,
}: ActionFunctionArgs): Promise<ActionReturn | ErrorMessage> {
  const formData = await request.formData();
  const result = SafeParseForm(ActionSchema, formData);
  if ("error" in result) return result;
  const { intent } = result;
  try {
    switch (intent) {
      case "getContacts": {
        const response: AxiosResponse<Contact[]> =
          await api.get<Contact[]>("api/user/contact");
        return { intent, data: response.data };
      }
      case "getUsers": {
        const [usersRes, contactsRes]: [
          AxiosResponse<SafeUser[]>,
          AxiosResponse<Contact[]>,
        ] = await Promise.all([
          api.get<SafeUser[]>("api/user"),
          api.get<Contact[]>("api/user/contact"),
        ]);
        return {
          intent,
          data: { users: usersRes.data, contacts: contactsRes.data },
        };
      }
      case "addContact": {
        const { userId } = result;
        await api.post("api/user/contact", { userId });
        const [usersRes, contactsRes]: [
          AxiosResponse<SafeUser[]>,
          AxiosResponse<Contact[]>,
        ] = await Promise.all([
          api.get<SafeUser[]>("api/user"),
          api.get<Contact[]>("api/user/contact"),
        ]);
        return {
          intent,
          data: { users: usersRes.data, contacts: contactsRes.data },
        };
      }
      default:
        return { error: "Invalid intent" };
    }
  } catch (err) {
    return handleAxiosError(err);
  }
}
