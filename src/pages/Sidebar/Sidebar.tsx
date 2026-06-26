import type { HomeLoaderReturn } from "../Home/Home.loader";
import { ChatList } from "./components/ChatList";
import { useMemo, useState } from "react";
import { ChatPrompt } from "../ChatPrompt/ChatPrompt";
import type { NavigationReturn } from "../Home/hooks/useHomeNavigation";
import { CollapsedSidebar } from "./components/CollapsedSidebar";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarSearchInput } from "./components/SidebarSearchInput";

type SidebarProps = {
  data: HomeLoaderReturn,
  nav: NavigationReturn,
  toggleSidebar: () => void,
  isHidden: boolean,
}
export function Sidebar({ data, nav, toggleSidebar, isHidden }: SidebarProps) {
  const { chats, groups, archived } = data;
  const { loadUsers, addContact, createChat, createGroup } = nav.actions;
  const { allUsers, unloadAllUsers, openChat, openGroup, showProfile } = nav;
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

  const openContacts = () => {
    loadUsers();
    setShowContacts(true);
  }
  const closeContacts = () => {
    unloadAllUsers();
    setShowContacts(false)
  }
  const openChatList = (regular: boolean) => {
    showContacts ? closeContacts() : setShowArchive(!regular)
  }

  return (
    <>
      {isHidden ?
        <CollapsedSidebar toggleSidebar={toggleSidebar} />
        :
        <aside className="flex flex-col  overflow-x-hidden m-2 *:rounded-sm *:m-2">
          <SidebarHeader
            toggleSidebar={toggleSidebar}
            showProfile={showProfile}
            openChatList={openChatList}
            openContacts={openContacts}
          />
          <SidebarSearchInput query={query} onChange={setQuery} />
          <main className="flex-1 flex flex-col text-center overflow-scroll 
          bg-fg2 border-fg4 border-[1px] py-1 px-0.5
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {
              showContacts ?
                <ChatPrompt
                  contacts={allUsers.contacts}
                  users={allUsers.users}
                  addContactFn={addContact}
                  createChatFn={createChat}
                  createGroupFn={createGroup}
                />

                :
                <ChatList
                  chats={filteredChats.chats}
                  groups={filteredChats.groups}
                  showChat={openChat}
                  showGroup={openGroup}
                />
            }
          </main>
        </aside >
      }
    </>
  )
}
