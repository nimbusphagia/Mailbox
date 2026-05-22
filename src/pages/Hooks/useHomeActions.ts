import type { FetcherWithComponents } from "react-router-dom";
import type { ActionReturn } from "../Home/Home.action";
import type { ErrorMessage } from "@/lib/utils";
import { type JsonValue, type UuidType } from "@/lib/schemas/util.schema";
import type { MessageCreate } from "@/lib/schemas/message.schema";

export type homeActionsReturn = ReturnType<typeof useHomeActions>;

export function useHomeActions(
  fetcher: FetcherWithComponents<ActionReturn | ErrorMessage>,
) {
  const submit = (payload: JsonValue) =>
    fetcher.submit(payload, {
      method: "post",
      action: "",
      encType: "application/json",
    });

  return {
    loadUsers: () => submit({ intent: "getUsers" }),
    addContact: (userId: UuidType) => submit({ intent: "addContact", userId }),
    createChat: (contactId: UuidType) =>
      submit({ intent: "createChat", contacts: [contactId] }),
    createGroup: (contacts: UuidType[]) =>
      submit({ intent: "createGroup", contacts }),
    openChat: (chatId: UuidType) => {
      submit({ intent: "getChat", chatId });
    },
    getContact: (userId: UuidType) => submit({ intent: "getContact", userId }),
    createMessage: (message: MessageCreate) =>
      submit({ intent: "createMessage", message }),
    editNickname: (userId: UuidType, nickname: string) =>
      submit({ intent: "editNickname", userId, nickname }),
  };
}
