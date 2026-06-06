import api from "@/lib/api";
import type { ChatType } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ActionSchema } from "@/lib/schemas/action.schema";

import {
  handleAxiosError,
  SafeParseRequest,
  type ErrorMessage,
} from "@/lib/utils";
import type { AxiosResponse } from "axios";
import type { ActionFunctionArgs } from "react-router-dom";
import type { GroupRes } from "@/lib/schemas/group.schema";

export type ActionReturn =
  | { intent: "getContacts"; data: ContactType[] }
  | { intent: "getUsers"; data: { users: SafeUser[]; contacts: ContactType[] } }
  | { intent: "createChat"; data: { chat: ChatType } }
  | { intent: "createGroup"; data: { chat: ChatType } }
  | { intent: "getChat"; data: { chat: ChatType } }
  | { intent: "getGroup"; data: { group: GroupRes } }
  | { intent: "getContact"; data: { contact: ContactType } }
  | { intent: "createMessage"; data: { chat: ChatType } }
  | { intent: "editNickname"; data: { contact: ContactType } }
  | {
      intent: "addContact";
      data: { users: SafeUser[]; contacts: ContactType[] };
    };

export async function HomeAction({
  request,
}: ActionFunctionArgs): Promise<ActionReturn | ErrorMessage> {
  const result = await SafeParseRequest(ActionSchema, request);
  if ("error" in result) return result;
  const { intent } = result;
  try {
    switch (intent) {
      case "getContacts": {
        const response: AxiosResponse<ContactType[]> =
          await api.get<ContactType[]>("api/user/contact");
        return { intent, data: response.data };
      }
      case "getUsers": {
        const [usersRes, contactsRes]: [
          AxiosResponse<SafeUser[]>,
          AxiosResponse<ContactType[]>,
        ] = await Promise.all([
          api.get<SafeUser[]>("api/user"),
          api.get<ContactType[]>("api/user/contact"),
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
          AxiosResponse<ContactType[]>,
        ] = await Promise.all([
          api.get<SafeUser[]>("api/user"),
          api.get<ContactType[]>("api/user/contact"),
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
      case "createGroup": {
        const { group, image } = result;
        if (!group) return { error: "Empty body" };

        const response = await api.post<ChatType>(
          "api/group",
          image instanceof File ? { ...group, image } : group,
          image instanceof File
            ? { headers: { "Content-Type": "multipart/form-data" } }
            : undefined,
        );

        return { intent, data: { chat: response.data } };
      }
      case "getChat": {
        const { chatId } = result;
        const response = await api.get<ChatType>(`api/chat/${chatId}`);
        return {
          intent,
          data: { chat: response.data },
        };
      }
      case "getGroup": {
        const { groupId } = result;
        const response = await api.get<GroupRes>(`api/group/${groupId}`);
        return {
          intent,
          data: { group: response.data },
        };
      }
      case "getContact": {
        const { userId } = result;
        const response = await api.get<ContactType>(
          `api/user/contact/${userId}`,
        );
        return {
          intent,
          data: { contact: response.data },
        };
      }
      case "createMessage": {
        const { message, image } = result;
        if (!message) return { error: "Empty message" };

        const isImageMessage =
          message.type === "IMAGE" && image instanceof File;

        const response = await api.post<ChatType>(
          "api/chat/message",
          isImageMessage ? { ...message, image } : message,
          isImageMessage
            ? { headers: { "Content-Type": "multipart/form-data" } }
            : undefined,
        );

        return { intent, data: { chat: response.data } };
      }
      case "editNickname": {
        const { userId, nickname } = result;
        const response = await api.patch<ContactType>(
          `api/user/contact/${userId}`,
          { nickname },
        );
        return {
          intent,
          data: { contact: response.data },
        };
      }

      default:
        return { error: "Invalid intent" };
    }
  } catch (err) {
    return handleAxiosError(err);
  }
}
