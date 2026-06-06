import type { FetcherWithComponents } from "react-router-dom";
import type { ActionReturn } from "../Home/Home.action";
import type { ErrorMessage } from "@/lib/utils";
import { type UuidType, type ValidImage } from "@/lib/schemas/util.schema";
import type { MessageCreate } from "@/lib/schemas/message.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import type { Action } from "@/lib/schemas/action.schema";

export type homeActionsReturn = ReturnType<typeof useHomeActions>;

export function useHomeActions(
  fetcher: FetcherWithComponents<ActionReturn | ErrorMessage>,
) {
  const submit = (payload: Action) => {
    if (payload.image) {
      return fetcher.submit(buildFormData(payload), {
        method: "post",
        action: "",
        encType: "multipart/form-data",
      });
    }
    return fetcher.submit(toJsonSafe(payload) as Record<string, never>, {
      method: "post",
      action: "",
      encType: "application/json",
    });
  };

  return {
    loadUsers: () => submit({ intent: "getUsers" }),
    addContact: (userId: UuidType) => submit({ intent: "addContact", userId }),
    createChat: (contactId: UuidType) =>
      submit({ intent: "createChat", contacts: [contactId] }),
    createGroup: (group: GroupReq, image?: ValidImage) =>
      submit({ intent: "createGroup", image, group }),
    openChat: (chatId: UuidType) => submit({ intent: "getChat", chatId }),
    openGroup: (groupId: UuidType) => submit({ intent: "getGroup", groupId }),
    getContact: (userId: UuidType) => submit({ intent: "getContact", userId }),
    createMessage: (message: MessageCreate, image?: ValidImage) =>
      submit({ intent: "createMessage", image, message }),
    editNickname: (userId: UuidType, nickname: string | null) =>
      submit({ intent: "editNickname", userId, nickname }),
  };
}

function buildFormData(payload: Action): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object" && value !== null) {
      const { image, ...rest } = value as Record<string, unknown>;
      formData.append(
        key,
        new Blob([JSON.stringify(rest)], { type: "application/json" }),
      );
      if (image instanceof File || image instanceof Blob) {
        formData.append("image", image);
      }
    } else {
      formData.append(
        key,
        new Blob([JSON.stringify(value)], { type: "application/json" }),
      );
    }
  }
  return formData;
}

function toJsonSafe(payload: Action): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== undefined),
  );
}
