import type { FetcherWithComponents } from "react-router-dom";
import type { ActionReturn } from "../Home/Home.action";
import type { ErrorMessage } from "@/lib/utils";
import { type UuidType } from "@/lib/schemas/util.schema";
import type { MessageCreate } from "@/lib/schemas/message.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import type { Action } from "@/lib/schemas/action.schema";

export type homeActionsReturn = ReturnType<typeof useHomeActions>;

export function useHomeActions(
  fetcher: FetcherWithComponents<ActionReturn | ErrorMessage>,
) {
  const submit = (payload: Action) => {
    if (payload.group?.image || payload.message?.type === "IMAGE") {
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
    createGroup: (group: GroupReq) => submit({ intent: "createGroup", group }),
    openChat: (chatId: UuidType) => submit({ intent: "getChat", chatId }),
    getContact: (userId: UuidType) => submit({ intent: "getContact", userId }),
    createMessage: (message: MessageCreate) =>
      submit({ intent: "createMessage", message }),
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
    } else {
      formData.append(
        key,
        new Blob([JSON.stringify(value)], {
          type: "application/json",
        }),
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
