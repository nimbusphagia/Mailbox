import api from "@/lib/api";
import type { ChatType } from "@/lib/schemas/chat.schema";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ActionSchema } from "@/lib/schemas/action.schema";

import {
  handleAxiosError,
  SafeParseJSON,
  type ErrorMessage,
} from "@/lib/utils";
import type { AxiosResponse } from "axios";
import type { ActionFunctionArgs } from "react-router-dom";

export type ActionReturn =
  | { intent: "getContacts"; data: Contact[] }
  | { intent: "getUsers"; data: { users: SafeUser[]; contacts: Contact[] } }
  | { intent: "createChat"; data: { chat: ChatType } }
  | { intent: "getChat"; data: { chat: ChatType } }
  | { intent: "createMessage"; data: { chat: ChatType } }
  | { intent: "addContact"; data: { users: SafeUser[]; contacts: Contact[] } };

export async function HomeAction({
  request,
}: ActionFunctionArgs): Promise<ActionReturn | ErrorMessage> {
  const data = await request.json();
  const result = SafeParseJSON(ActionSchema, data);
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
      case "createChat": {
        const { contacts } = result;
        const response = await api.post<ChatType>("api/chat", {
          contactId: contacts![0],
        });
        return {
          intent,
          data: { chat: response.data },
        };
      }
      case "getChat": {
        const { chatId } = result;
        const response = await api.get<ChatType>(`api/chat/${chatId}`);
        return {
          intent,
          data: { chat: response.data },
        };
      }
      case "createMessage": {
        const { message } = result;
        const response = await api.post<ChatType>("api/chat/message", message);
        return {
          intent,
          data: { chat: response.data },
        };
      }
      default:
        return { error: "Invalid intent" };
    }
  } catch (err) {
    return handleAxiosError(err);
  }
}
