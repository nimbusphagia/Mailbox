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
  onChatClosed: () => void;
  onChatCreated: (chat: ChatRes) => void;
  onContactOpened: (contact: ContactType) => void;
  onBlockedContactsOpened: (contacts: ContactType[]) => void;
  onProfileOpened: (user: SafeUser) => void;
}

export function useHomeFetcher({
  onError,
  onMessage,
  onRefreshUsers,
  onChatOpened,
  onChatClosed,
  onChatCreated,
  onContactOpened,
  onBlockedContactsOpened,
  onProfileOpened,
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
      getMe: () => {
        const d = data as Extract<ActionReturn, { intent: "getMe" }>;
        onProfileOpened(d.data.user);
      },
      editProfile: () => {
        const d = data as Extract<ActionReturn, { intent: "editProfile" }>;
        onProfileOpened(d.data.user);
        onMessage("Changes applied");
      },
      toggleBlocked: () => {
        const d = data as Extract<ActionReturn, { intent: "toggleBlocked" }>;
        onMessage("Changes applied.");
        onRefreshUsers(d.data.contacts, d.data.users);
        onChatClosed();
      },
      createChat: () => {
        const d = data as Extract<ActionReturn, { intent: "createChat" }>;
        onChatCreated(d.data.chat);
      },

      editGroup: () => {
        const d = data as Extract<ActionReturn, { intent: "editGroup" }>;
        onMessage("Group updated succesfully.");
        onChatCreated(d.data.chat);
      },
      deleteGroup: () => {
        onMessage("Group deleted succesfully.");
        onChatClosed();
      },
      leaveGroup: () => {
        onMessage("You left the group succesfully.");
        onChatClosed();
      },
      removeGroupMember: () => {
        const d = data as Extract<
          ActionReturn,
          { intent: "removeGroupMember" }
        >;
        onMessage("Succesfully removed member");
        onChatOpened(d.data.group);
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
      getBlockedContacts: () => {
        const d = data as Extract<
          ActionReturn,
          { intent: "getBlockedContacts" }
        >;
        onBlockedContactsOpened(d.data.contacts);
      },
      changePassword: () => {
        const d = data as Extract<ActionReturn, { intent: "changePassword" }>;
        onMessage(d.data.message);
      },

      //Sidebar scope
      getUsers: () => {
        const d = data as Extract<ActionReturn, { intent: "getUsers" }>;
        onRefreshUsers(d.data.contacts, d.data.users);
      },
      addContact: () => {
        const d = data as Extract<ActionReturn, { intent: "addContact" }>;
        onRefreshUsers(d.data.contacts, d.data.users);
        onMessage("Added new contact.");
      },
      toggleArchived: () => {
        onMessage("Changes applied.");
        onChatClosed();
      },
      createGroup: () => {
        const d = data as Extract<ActionReturn, { intent: "createGroup" }>;
        onChatCreated(d.data.chat);
      },
      editNickname: () => {
        const d = data as Extract<ActionReturn, { intent: "editNickname" }>;
        onMessage("Nickname updated succesfully.");
        onContactOpened(d.data.contact);
      },
    };

    handlers[data.intent as ActionReturn["intent"]]?.();
  }, [fetcher.state, fetcher.data]);

  return fetcher;
}
