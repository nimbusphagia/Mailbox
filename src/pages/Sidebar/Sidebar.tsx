import type { HomeLoaderReturn } from "../Home/Home.loader";
import { ChatList } from "./components/ChatList";
import { useEffect, useMemo, useState } from "react";
import { Contacts } from "../Contacts/Contacts";
import type { NavigationReturn } from "../Home/hooks/useHomeNavigation";
import { CollapsedSidebar } from "./components/CollapsedSidebar";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarMainLayout } from "@/layouts/SidebarMainLayout";
import { ConfigPanel } from "../Config/Config";

type SidebarProps = {
  data: HomeLoaderReturn,
  nav: NavigationReturn,
  toggleSidebar: () => void,
  isHidden: boolean,
}
type SidebarView = "chats" | "archived" | "contacts" | "profile";

export function Sidebar({ data, nav, toggleSidebar, isHidden }: SidebarProps) {
  const { chats, groups, archived, assets } = data;
  const { loadUsers, addContact, createChat, createGroup, logout } = nav.actions;
  const { allUsers, unloadAllUsers, openChat, openGroup, showProfile, activeChat } = nav;
  const [query, setQuery] = useState<string>("");
  const [showSearchbar, setShowSearchbar] = useState<boolean>(true);
  const [view, setView] = useState<SidebarView>("chats");

  const filteredChats = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return {
        chats: view === "archived" ? archived.chats : chats,
        groups: view === "archived" ? archived.groups : groups,
      };
    }

    return {
      chats: (view === "archived" ? archived.chats : chats).filter(chat =>
        (chat.otherMember.nickname ?? chat.otherMember.username)
          .toLowerCase()
          .includes(search)
      ),

      groups: (view === "archived" ? archived.groups : groups).filter(group =>
        group.name.toLowerCase().includes(search)
      ),
    };
  }, [query, view, chats, groups, archived]);

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return {
        contacts: allUsers.contacts,
        users: allUsers.users,
      }
    }


    return {
      contacts: allUsers.contacts.filter(contact =>
        (contact.nickname ?? contact.user?.name)?.toLowerCase().includes(search)
      ),
      users: allUsers.users.filter((user =>
        (user.name ?? user.username).toLowerCase().includes(search)
      ))
    }
  }, [query, allUsers])

  const openContacts = () => {
    loadUsers();
    setQuery("");
    setView("contacts");
  }
  const closeContacts = () => {
    setView("chats")
    unloadAllUsers();
    setQuery("");
  }
  const openChatList = (regular: boolean) => {
    if (view === "contacts") closeContacts();
    setView(regular ? "chats" : "archived")
  }
  const openProfile = () => {
    showProfile();
    setShowSearchbar(false);
    setView("profile");
  }

  useEffect(() => {
    if (activeChat) closeContacts();
  }, [activeChat]);

  const mainContent = {
    chats: <ChatList
      chats={filteredChats.chats}
      groups={filteredChats.groups}
      showChat={openChat}
      showGroup={openGroup}
      isArchived={false}
    />,
    archived: <ChatList
      chats={filteredChats.chats}
      groups={filteredChats.groups}
      showChat={openChat}
      showGroup={openGroup}
      isArchived={true}
    />,
    contacts: <Contacts
      contacts={filteredUsers.contacts}
      users={filteredUsers.users}
      addContactFn={addContact}
      createChatFn={createChat}
      createGroupFn={createGroup}
      profilePictures={assets.profilePictures}
      showSearchbar={(val: boolean) => setShowSearchbar(val)}
    />,
    profile: <ConfigPanel
      showProfile={showProfile}
      showBlocked={() => null}
      logoutFn={logout}
    />,
  }
  return (
    <>
      {isHidden ?
        <CollapsedSidebar toggleSidebar={toggleSidebar} />
        :
        <aside className="flex flex-col m-2 overflow-hidden">
          <SidebarHeader
            toggleSidebar={toggleSidebar}
            openProfile={openProfile}
            openChatList={openChatList}
            openContacts={openContacts}
          />
          <SidebarMainLayout
            query={query}
            onChange={setQuery}
            search={showSearchbar}
            children={mainContent[view]}
          />
        </aside >
      }
    </>
  )
}
