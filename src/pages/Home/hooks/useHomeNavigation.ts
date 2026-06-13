import { useHomeActions } from "./useHomeActions";
import { useHomeFetcher } from "./useHomeFetcher";
import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { HomeLoaderReturn } from "../Home.loader";
import { useState } from "react";

type ModalData = { contacts: ContactType[]; users: SafeUser[] };

type NavigationCallbacks = {
  onError: (msg: string) => void;
  onMessage: (msg: string) => void;
};

export type NavigationReturn = ReturnType<typeof useHomeNavigation>;

export function useHomeNavigation(
  loaderData: HomeLoaderReturn,
  { onError, onMessage }: NavigationCallbacks,
) {
  const [activeChat, setActiveChat] = useState<ChatRes | GroupRes | null>(null);
  const [activeContact, setActiveContact] = useState<ContactType | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    contacts: [],
    users: [],
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const closeInfo = () => setShowInfo(false);

  const fetcher = useHomeFetcher({
    onChatOpened: (chat) => setActiveChat(chat),
    onChatCreated: (chat) => {
      setActiveChat(chat);
      closeModal();
    },
    onContactOpened: (contact) => setActiveContact(contact),
    onRefreshUsers: (contacts, users) => {
      const contactUserIds = new Set(
        contacts.map((c) => c.user?.id || c.isBlocked),
      );
      const filtered = users.filter(
        (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id),
      );
      setModalData({ contacts, users: filtered });
      openModal();
    },
    onError,
    onMessage,
  });

  const actions = useHomeActions(fetcher);

  const openChat = (id: UuidType) => {
    actions.openChat(id);
    setActiveContact(null);
    setShowInfo(false);
  };

  const openGroup = (id: UuidType) => {
    actions.openGroup(id);
    setActiveContact(null);
    setShowInfo(false);
  };

  const closeChat = () => {
    setActiveChat(null);
    setShowInfo(false);
  };

  const openContact = (id: UuidType) => {
    actions.getContact(id);
    setShowInfo(true);
  };

  const closeContact = (chatId: UuidType) => {
    actions.openChat(chatId);
    setActiveContact(null);
  };

  return {
    activeChat,
    activeContact,
    showInfo,
    setShowInfo,
    closeInfo,
    showModal,
    modalData,
    actions,
    openChat,
    openGroup,
    openContact,
    closeChat,
    closeContact,
    openModal,
    closeModal,
  };
}
