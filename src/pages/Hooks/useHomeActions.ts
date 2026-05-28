import type { FetcherWithComponents } from "react-router-dom";
import type { ActionReturn } from "../Home/Home.action";
import type { ErrorMessage } from "@/lib/utils";
import {
  type JsonValue,
  type UuidType,
  type ValidImage,
} from "@/lib/schemas/util.schema";
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
    createMessage: (message: MessageCreate, image?: ValidImage) => {
      if (message.type === "IMAGE" && image) {
        const formData = new FormData();
        formData.append("intent", "createMessage");
        formData.append("message[chatId]", message.chatId);
        formData.append("message[type]", message.type);
        if (message.content) {
          formData.append("message[content]", message.content);
        }
        if (message.replyToId) {
          formData.append("message[replyToId]", message.replyToId);
        }
        formData.append("image", image);

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
