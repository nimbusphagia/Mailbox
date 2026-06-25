import { SquarePlus, Package, MessagesSquare, MoveDiagonal2, UserCog } from "lucide-react"
import type { HomeLoaderReturn } from "../Home/Home.loader";
import { Button } from "@/components/ui/button";
import { ChatList } from "./components/ChatList";
import type { UuidType } from "@/lib/schemas/util.schema";
import { useMemo, useState } from "react";

type SidebarProps = {
  data: HomeLoaderReturn,
  loadUsers: () => void,
  openProfile: () => void,
  openChat: (chatId: UuidType) => void,
  openGroup: (chatId: UuidType) => void,
  toggleSidebar: () => void,
  isHidden: boolean,
}
export function Sidebar({ data, loadUsers, openChat, openGroup, openProfile, toggleSidebar, isHidden }: SidebarProps) {
  const { chats, groups, archived } = data;
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
  return (
    <>
      {isHidden ?
        <div className="max-h-fit flex items-start pl-2 pr-1 mt-4 justify-between 
      *:text-bg1 *:size-[2.5em] [&>button>*]:size-full *:rounded-full">
          <Button
            onClick={toggleSidebar}
          >
            <MoveDiagonal2 />
          </Button>
        </div>
        :
        <aside className="flex flex-col  overflow-x-hidden m-2 *:rounded-sm *:m-2">
          <header className="max-h-fit flex items-center justify-between *:text-bg1 
         *:size-[2.5em] [&>button>*]:size-full *:rounded-full">
            <Button
              onClick={toggleSidebar}
            >
              <MoveDiagonal2 />
            </Button>

            <Button
              onClick={() => setShowArchive(false)}
            >
              <MessagesSquare />
            </Button>
            <Button
              onClick={() => setShowArchive(true)}
            >
              <Package />
            </Button>
            <Button
              onClick={openProfile}>
              <UserCog />
            </Button>
            <Button
              onClick={loadUsers}>
              <SquarePlus />
            </Button>
          </header>
          <div className="flex items-center justify-center">
            <input
              placeholder="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-fg2 py-1.5 px-3 text-bg1 text-xs font-normal 
              w-full outline-none border-fg4 border-[1px] focus:bg-fg4/70 
              focus:placeholder:text-bg1 focus:text-bg1 rounded-sm"
            />
          </div>
          <main className="flex-1 flex flex-col text-center overflow-scroll 
          bg-fg2 border-fg4 border-[1px] py-1 px-0.5
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <ChatList
              chats={filteredChats.chats}
              groups={filteredChats.groups}
              showChat={openChat}
              showGroup={openGroup}
            />          </main>
        </aside >
      }
    </>
  )
}

