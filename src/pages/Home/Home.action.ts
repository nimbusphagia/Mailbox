import api from "@/lib/api";
import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ActionSchema } from "@/lib/schemas/action.schema";

import {
  handleAxiosError,
  SafeParseRequest,
  type ErrorMessage,
} from "@/lib/utils";
import type { AxiosResponse } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { type GroupRes } from "@/lib/schemas/group.schema";

export type ActionReturn =
  | { intent: "getMe"; data: { user: SafeUser } }
  | { intent: "editProfile"; data: { user: SafeUser } }
  | { intent: "getContacts"; data: ContactType[] }
  | { intent: "getUsers"; data: { users: SafeUser[]; contacts: ContactType[] } }
  | { intent: "createChat"; data: { chat: ChatRes } }
  | { intent: "createGroup"; data: { chat: ChatRes } }
  | { intent: "editGroup"; data: { chat: ChatRes } }
  | { intent: "deleteGroup" }
  | { intent: "toggleArchived" }
  | { intent: "getChat"; data: { chat: ChatRes } }
  | { intent: "getGroup"; data: { group: GroupRes } }
  | { intent: "leaveGroup" }
  | { intent: "removeGroupMember"; data: { group: GroupRes } }
  | { intent: "getContact"; data: { contact: ContactType } }
  | {
      intent: "toggleBlocked";
      data: { users: SafeUser[]; contacts: ContactType[] };
    }
  | { intent: "createMessage"; data: { chat: ChatRes | GroupRes } }
  | { intent: "editNickname"; data: { contact: ContactType } }
  | {
      intent: "addContact";
      data: { users: SafeUser[]; contacts: ContactType[] };
    };

export async function HomeAction({
  request,
}: ActionFunctionArgs): Promise<ActionReturn | ErrorMessage | Response> {
  const result = await SafeParseRequest(ActionSchema, request);
  if ("error" in result) return result;
  const { intent } = result;
  try {
    switch (intent) {
      case "getMe": {
        const response = await api.get<SafeUser>(`api/user/me`);
        return {
          intent,
          data: { user: response.data },
        };
      }
      case "editProfile": {
        const { user, image, asset } = result;
        if (!user) return { error: "Empty body" };

        let response;

        if (image instanceof File) {
          response = await api.patch<SafeUser>(
            `api/user/${user.id}`,
            { ...user, image },
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } else if (asset) {
          response = await api.patch<SafeUser>(`api/user/${user.id}`, {
            ...user,
            asset,
          });
        } else {
          response = await api.patch<SafeUser>(`api/user/${user.id}`, user);
        }

        return { intent, data: { user: response.data } };
      }

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
      case "toggleBlocked": {
        const { contactId } = result;
        await api.patch<ContactType>(`api/user/contact/block/${contactId}`);
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
      case "toggleArchived": {
        const { chatId } = result;
        await api.post("api/chat/archived", { chatId });
        return {
          intent,
        };
      }

      case "createChat": {
        const { contacts } = result;
        const response = await api.post<ChatRes>("api/chat", {
          contactId: contacts![0],
        });
        return {
          intent,
          data: { chat: response.data },
        };
      }
      case "createGroup": {
        const { group, image, asset } = result;
        if (!group) return { error: "Empty body" };

        let response;

        if (image instanceof File) {
          response = await api.post<ChatRes>(
            "api/group",
            { ...group, image },
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } else if (asset) {
          response = await api.post<ChatRes>("api/group", {
            ...group,
            asset,
          });
        } else {
          response = await api.post<ChatRes>("api/group", group);
        }

        return { intent, data: { chat: response.data } };
      }
      case "editGroup": {
        const { group, image, asset } = result;
        if (!group) return { error: "Empty body" };

        let response;

        if (image instanceof File) {
          response = await api.put<ChatRes>(
            `api/group/${group.id}`,
            { ...group, image },
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } else if (asset) {
          response = await api.put<ChatRes>(`api/group/${group.id}`, {
            ...group,
            asset,
          });
        } else {
          response = await api.put<ChatRes>(`api/group/${group.id}`, group);
        }

        return { intent, data: { chat: response.data } };
      }
      case "deleteGroup": {
        const { groupId } = result;
        await api.delete(`api/group/${groupId}`);
        return { intent };
      }
      case "leaveGroup": {
        const { chatId } = result;
        await api.delete(`api/group/leave/${chatId}`);
        return {
          intent,
        };
      }
      case "getChat": {
        const { chatId } = result;
        const response = await api.get<ChatRes>(`api/chat/${chatId}`);
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
      case "removeGroupMember": {
        const { userId, chatId } = result;
        await api.delete(`api/group/member/${chatId}/${userId}`);
        const response = await api.get<GroupRes>(`api/group/${chatId}`);
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

        const response = await api.post<ChatRes | GroupRes>(
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
      case "logout": {
        await api.post("auth/logout");
        return redirect("/login");
      }
      default:
        return { error: "Invalid intent" };
    }
  } catch (err) {
    return handleAxiosError(err);
  }
}
