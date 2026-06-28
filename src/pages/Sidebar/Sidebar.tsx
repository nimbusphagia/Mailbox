import type { HomeLoaderReturn } from "../Home/Home.loader";
import { ChatList } from "./components/ChatList";
import { useEffect, useMemo, useState } from "react";
import { Contacts } from "../Contacts/Contacts";
import type { NavigationReturn } from "../Home/hooks/useHomeNavigation";
import { CollapsedSidebar } from "./components/CollapsedSidebar";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarMainLayout } from "@/layouts/SidebarMainLayout";

type SidebarProps = {
  data: HomeLoaderReturn,
  nav: NavigationReturn,
  toggleSidebar: () => void,
  isHidden: boolean,
}
export function Sidebar({ data, nav, toggleSidebar, isHidden }: SidebarProps) {
  const { chats, groups, archived, assets } = data;
  const { loadUsers, addContact, createChat, createGroup } = nav.actions;
  const { allUsers, unloadAllUsers, openChat, openGroup, showProfile, activeChat } = nav;
  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [showArchive, setShowArchive] = useState<boolean>(false);

  const filteredChats = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return {
        chats: showArchive ? archived.chats : chats,
        groups: showArchive ? archived.groups : groups,
      };
    }

    return {
      chats: (showArchive ? archived.chats : chats).filter(chat =>
        (chat.otherMember.nickname ?? chat.otherMember.username)
          .toLowerCase()
          .includes(search)
      ),

      groups: (showArchive ? archived.groups : groups).filter(group =>
        group.name.toLowerCase().includes(search)
      ),
    };
  }, [query, showArchive, chats, groups, archived]);

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
    setShowContacts(true);
  }
  const closeContacts = () => {
    setShowContacts(false)
    unloadAllUsers();
    setQuery("");
  }
  const openChatList = (regular: boolean) => {
    if (showContacts) closeContacts();
    setShowArchive(!regular)
  }

  useEffect(() => {
    if (activeChat) closeContacts();
  }, [activeChat]);

  return (
    <>
      {isHidden ?
        <CollapsedSidebar toggleSidebar={toggleSidebar} />
        :
        <aside className="flex flex-col m-2 overflow-hidden">
          <SidebarHeader
            toggleSidebar={toggleSidebar}
            showProfile={showProfile}
            openChatList={openChatList}
            openContacts={openContacts}
          />
          <SidebarMainLayout
            query={query}
            onChange={setQuery}
            children={
              showContacts ?
                <Contacts
                  contacts={filteredUsers.contacts}
                  users={filteredUsers.users}
                  addContactFn={addContact}
                  createChatFn={createChat}
                  createGroupFn={createGroup}
                  profilePictures={assets.profilePictures}
                />
                :
                <ChatList
                  chats={filteredChats.chats}
                  groups={filteredChats.groups}
                  showChat={openChat}
                  showGroup={openGroup}
                />
            }
          />
        </aside >
      }
    </>
  )
}
