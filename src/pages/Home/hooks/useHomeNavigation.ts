import { useHomeActions } from "./useHomeActions";
import { useHomeFetcher } from "./useHomeFetcher";
import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { HomeLoaderReturn } from "../Home.loader";
import { useReducer, useState } from "react";

export type AllUsers = { contacts: ContactType[]; users: SafeUser[] };

type MainView =
  | { screen: "empty" }
  | { screen: "profile"; user: SafeUser }
  | { screen: "blockedContacts"; contacts: ContactType[] }
  | { screen: "chat"; chat: ChatRes | GroupRes }
  | { screen: "contactInfo"; chat: ChatRes; contact: ContactType }
  | { screen: "groupInfo"; chat: GroupRes };

type ViewAction =
  | { type: "OPEN_CHAT"; chat: ChatRes | GroupRes }
  | { type: "OPEN_CONTACT_INFO"; contact: ContactType }
  | { type: "OPEN_BLOCKED_CONTACTS"; contacts: ContactType[] }
  | { type: "SHOW_GROUP_INFO"; chat: GroupRes }
  | { type: "HIDE_INFO" }
  | { type: "OPEN_PROFILE"; user: SafeUser }
  | { type: "CLEAR" };

type NavigationCallbacks = {
  onError: (msg: string) => void;
  onMessage: (msg: string) => void;
};

export type NavigationReturn = ReturnType<typeof useHomeNavigation>;

export function useHomeNavigation(
  loaderData: HomeLoaderReturn,
  { onError, onMessage }: NavigationCallbacks,
) {
  const [view, dispatch] = useReducer(viewReducer, {
    screen: "empty",
  } as MainView);
  const [allUsers, setAllUsers] = useState<AllUsers>({
    contacts: [],
    users: [],
  });

  const fetcher = useHomeFetcher({
    onChatOpened: (chat) => dispatch({ type: "OPEN_CHAT", chat }),
    onChatCreated: (chat) => dispatch({ type: "OPEN_CHAT", chat }),
    onContactOpened: (contact) =>
      dispatch({ type: "OPEN_CONTACT_INFO", contact }),
    onGroupInfoOpened: (chat) => dispatch({ type: "SHOW_GROUP_INFO", chat }),
    onBlockedContactsOpened: (contacts) =>
      dispatch({ type: "OPEN_BLOCKED_CONTACTS", contacts }),
    onRefreshUsers: (contacts, users) => {
      const contactUserIds = new Set(
        contacts.map((c) => c.user?.id || c.isBlocked),
      );
      const filtered = users.filter(
        (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id),
      );
      setAllUsers({ contacts, users: filtered });
    },
    onProfileOpened: (user) => dispatch({ type: "OPEN_PROFILE", user }),
    onChatClosed: () => dispatch({ type: "CLEAR" }),
    onError,
    onMessage,
  });

  const actions = useHomeActions(fetcher);

  const showProfile = () => actions.getMe();
  const hideProfile = () => dispatch({ type: "CLEAR" });
  const openChat = (id: UuidType) => actions.openChat(id);
  const openGroup = (id: UuidType) => actions.openGroup(id);
  const closeChat = () => dispatch({ type: "CLEAR" });
  const openContact = (id: UuidType) => actions.getContact(id);
  const closeContact = (chatId: UuidType) => actions.openChat(chatId);
  const showGroupInfo = (chat: GroupRes) =>
    dispatch({ type: "SHOW_GROUP_INFO", chat });
  const hideInfo = () => dispatch({ type: "HIDE_INFO" });
  const unloadAllUsers = () => setAllUsers({ contacts: [], users: [] });
  const showBlockedContacts = () => actions.getBlockedContacts();

  return {
    view,
    allUsers,
    unloadAllUsers,
    actions,
    showProfile,
    hideProfile,
    openChat,
    openGroup,
    openContact,
    showBlockedContacts,
    closeChat,
    closeContact,
    showGroupInfo,
    hideInfo,
    isLoading: fetcher.state !== "idle",
  };
}

function viewReducer(state: MainView, action: ViewAction): MainView {
  switch (action.type) {
    case "OPEN_CHAT":
      return { screen: "chat", chat: action.chat };

    case "OPEN_CONTACT_INFO":
      if (state.screen !== "chat" && state.screen !== "contactInfo") {
        return state;
      }
      return {
        screen: "contactInfo",
        chat: state.chat as ChatRes,
        contact: action.contact,
      };
    case "OPEN_BLOCKED_CONTACTS":
      return { screen: "blockedContacts", contacts: action.contacts };

    case "SHOW_GROUP_INFO":
      if (
        (state.screen !== "chat" || !state.chat.isGroup) &&
        state.screen !== "groupInfo"
      )
        return state;
      return { screen: "groupInfo", chat: action.chat as GroupRes };

    case "HIDE_INFO":
      if (state.screen === "contactInfo" || state.screen === "groupInfo") {
        return { screen: "chat", chat: state.chat };
      }
      return state;

    case "OPEN_PROFILE":
      return { screen: "profile", user: action.user };

    case "CLEAR":
      return { screen: "empty" };
  }
}
