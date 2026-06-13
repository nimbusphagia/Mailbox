import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import type { ErrorMessage } from "@/lib/utils";
import type { ActionReturn } from "../Home.action";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";

interface UseHomeFetcherProps {
  onError: (message: string) => void;
  onMessage: (message: string) => void;
  onRefreshUsers: (contacts: ContactType[], users: SafeUser[]) => void;
  onChatOpened: (chat: ChatRes | GroupRes) => void;
  onChatCreated: (chat: ChatRes) => void;
  onContactOpened: (contact: ContactType) => void;
}

export function useHomeFetcher({
  onError,
  onMessage,
  onRefreshUsers,
  onChatOpened,
  onChatCreated,
  onContactOpened,
}: UseHomeFetcherProps) {
  const fetcher = useFetcher<ActionReturn | ErrorMessage>();

  useEffect(() => {
    if (fetcher.state !== "idle") return;
    const data = fetcher.data;
    if (!data) return;

    if ("error" in data) {
      onError(data.error);
      return;
    }

    const handlers: Partial<Record<ActionReturn["intent"], () => void>> = {
      getUsers: () => {
        const d = data as Extract<ActionReturn, { intent: "getUsers" }>;
        onRefreshUsers(d.data.contacts, d.data.users);
      },
      addContact: () => {
        const d = data as Extract<ActionReturn, { intent: "addContact" }>;
        onRefreshUsers(d.data.contacts, d.data.users);
        onMessage("Added new contact.");
      },
      createChat: () => {
        const d = data as Extract<ActionReturn, { intent: "createChat" }>;
        onMessage("Created new chat.");
        onChatCreated(d.data.chat);
      },
      getChat: () => {
        const d = data as Extract<ActionReturn, { intent: "getChat" }>;
        onChatOpened(d.data.chat);
      },
      getGroup: () => {
        const d = data as Extract<ActionReturn, { intent: "getGroup" }>;
        onChatOpened(d.data.group);
      },
      createMessage: () => {
        const d = data as Extract<ActionReturn, { intent: "createMessage" }>;
        onChatOpened(d.data.chat);
      },
      getContact: () => {
        const d = data as Extract<ActionReturn, { intent: "getContact" }>;
        onContactOpened(d.data.contact);
      },
      editNickname: () => {
        const d = data as Extract<ActionReturn, { intent: "editNickname" }>;
        onContactOpened(d.data.contact);
      },
    };

    handlers[data.intent as ActionReturn["intent"]]?.();
  }, [fetcher.state, fetcher.data]);

  return fetcher;
}
