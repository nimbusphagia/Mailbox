import { useHomeActions } from "./useHomeActions";
import { useHomeFetcher } from "./useHomeFetcher";
import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { HomeLoaderReturn } from "../Home.loader";
import { useState } from "react";

export type AllUsers = { contacts: ContactType[]; users: SafeUser[] };

type NavigationCallbacks = {
  onError: (msg: string) => void;
  onMessage: (msg: string) => void;
};

export type NavigationReturn = ReturnType<typeof useHomeNavigation>;

export function useHomeNavigation(
  loaderData: HomeLoaderReturn,
  { onError, onMessage }: NavigationCallbacks,
) {
  const [userInfo, setUserInfo] = useState<SafeUser | null>(loaderData.user);
  const [activeChat, setActiveChat] = useState<ChatRes | GroupRes | null>(null);
  const [activeContact, setActiveContact] = useState<ContactType | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const emptyMain = !activeChat && !showUserInfo && !showInfo;
  const [allUsers, setAllUsers] = useState<AllUsers>({
    contacts: [],
    users: [],
  });

  const closeInfo = () => setShowInfo(false);

  const clearMain = () => {
    setActiveChat(null);
    setActiveContact(null);
    setShowInfo(false);
    setShowUserInfo(false);
  };

  const fetcher = useHomeFetcher({
    onChatOpened: (chat) => {
      clearMain();
      setActiveChat(chat);
    },
    onChatCreated: (chat) => {
      clearMain();
      setActiveChat(chat);
    },
    onContactOpened: (contact) => {
      setShowInfo(true);
      setActiveContact(contact);
    },
    onRefreshUsers: (contacts, users) => {
      const contactUserIds = new Set(
        contacts.map((c) => c.user?.id || c.isBlocked),
      );
      const filtered = users.filter(
        (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id),
      );
      setAllUsers({ contacts, users: filtered });
    },
    onProfileOpened: (user) => {
      clearMain();
      setShowUserInfo(true);
      setUserInfo(user);
    },
    onError,
    onMessage,
  });
  const actions = useHomeActions(fetcher);

  const showProfile = () => {
    actions.getMe();
  };
  const hideProfile = () => {
    setShowUserInfo(false);
    setUserInfo(null);
  };
  const openChat = (id: UuidType) => {
    actions.openChat(id);
  };

  const openGroup = (id: UuidType) => {
    actions.openGroup(id);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const openContact = (id: UuidType) => {
    actions.getContact(id);
  };

  const closeContact = (chatId: UuidType) => {
    actions.openChat(chatId);
  };
  const unloadAllUsers = () => {
    setAllUsers({ contacts: [], users: [] });
  };

  return {
    showProfile,
    hideProfile,
    activeChat,
    activeContact,
    userInfo,
    showUserInfo,
    showInfo,
    setShowInfo,
    closeInfo,
    allUsers,
    unloadAllUsers,
    actions,
    openChat,
    openGroup,
    openContact,
    closeChat,
    closeContact,
    emptyMain,
    isLoading: fetcher.state !== "idle" && !emptyMain,
  };
}
