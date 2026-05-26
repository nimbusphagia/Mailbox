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
  const submitFormData = (formData: FormData) =>
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
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
    createMessage: (message: MessageCreate) => {
      if (message.type === "IMAGE") {
        const formData = new FormData();
        formData.append("intent", "createMessage");
        formData.append("chatId", message.chatId);
        formData.append("type", message.type);
        if (message.content) {
          formData.append("content", message.content);
        }
        if (message.replyToId) {
          formData.append("replyToId", message.replyToId);
        }
        formData.append("image", message.image);
        return submitFormData(formData);
      }

      return submit({
        intent: "createMessage",
        message,
      });
    },
    editNickname: (userId: UuidType, nickname: string | null) =>
      submit({ intent: "editNickname", userId, nickname }),
  };
}
