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
  onGroupInfoOpened: (chat: GroupRes) => void;
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
  onGroupInfoOpened,
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

    switch (data.intent) {
      case "getMe":
        onProfileOpened(data.data.user);
        break;
      case "editProfile":
        onProfileOpened(data.data.user);
        onMessage("Profile updated");
        break;
      case "toggleBlocked":
        onContactOpened(data.data.contact);
        break;
      case "unblockContact":
        onRefreshUsers(data.data.contacts, data.data.users);
        onBlockedContactsOpened(data.data.blocked);
        break;
      case "createChat":
        onChatCreated(data.data.chat);
        break;
      case "editGroup":
        onMessage("Group info updated.");
        onGroupInfoOpened(data.data.chat);
        break;
      case "deleteGroup":
        onMessage("Group deleted.");
        onChatClosed();
        break;
      case "leaveGroup":
        onMessage("You left the group.");
        onChatClosed();
        break;
      case "removeGroupMember":
        onMessage("Member removed");
        onChatOpened(data.data.group);
        break;
      case "getChat":
        onChatOpened(data.data.chat);
        break;
      case "getGroup":
        onChatOpened(data.data.group);
        break;
      case "createMessage":
        onChatOpened(data.data.chat);
        break;
      case "getContact":
        onContactOpened(data.data.contact);
        break;
      case "getBlockedContacts":
        onBlockedContactsOpened(data.data.blocked);
        break;
      case "changePassword":
        onMessage(data.data.message);
        break;
      case "getUsers":
        onRefreshUsers(data.data.contacts, data.data.users);
        break;
      case "addContact":
        onRefreshUsers(data.data.contacts, data.data.users);
        onMessage("Added new contact.");
        break;
      case "toggleArchived":
        onChatClosed();
        break;
      case "createGroup":
        onChatCreated(data.data.chat);
        break;
      case "editNickname":
        onContactOpened(data.data.contact);
        break;
    }
  }, [fetcher.state, fetcher.data]);
  return fetcher;
}
