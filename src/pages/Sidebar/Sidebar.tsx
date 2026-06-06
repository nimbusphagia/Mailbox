import { SquarePlus, Package } from "lucide-react"
import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import type { HomeLoaderReturn } from "../Home/Home.loader";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/ChatList";
import type { UuidType } from "@/lib/schemas/util.schema";
import { LogoVar2 } from "@/components/ui/logo3";

type SidebarProps = {
  data: HomeLoaderReturn,
  loadUsers: () => void,
  openChat: (chatId: UuidType) => void,
  openGroup: (chatId: UuidType) => void,
}
export function Sidebar({ data, loadUsers, openChat, openGroup }: SidebarProps) {
  const { user, chats, groupChats } = data;
  return (
    <aside className="flex flex-col bg-fg4/80 text-bg1 font-semibold overflow-y-scroll overflow-x-hidden border-r-2 border-bg4">
      <header className="h-[12%] bg-fg2/90 p-3 grid grid-cols-[10%_1fr_auto] text-center items-center *:flex *:items-center">
        <Avatar size="lg">
          <AvatarImage
            src={user.imgUrl}
          />
        </Avatar>
        <div className="self-center justify-center">
          <LogoVar2 className="text-[0.255rem] text-bg1" />
        </div>
        <div className="justify-around gap-0.5">
          <Button type="button" className="px-1.5" onClick={loadUsers}>
            <SquarePlus strokeWidth={2} className="text-bg1 size-[1.5em]" />
          </Button>
          <Button className="px-1.5">
            <Package strokeWidth={2} className="text-bg1 size-[1.5em]" />
          </Button>
        </div>
      </header>
      <div className="flex items-center justify-center">
        <input
          placeholder=":search"
          className="bg-fg3/95 p-1 px-2 text-sm font-bold w-full outline-none 
          focus:bg-fg4/70 focus:placeholder:text-bg2 focus:text-bg1"
        />
      </div>
      <main className="flex-1 flex flex-col text-center max-w-full max-h-full overflow-scroll">
        {chats.length === 0 ?
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-sm text-bg1">No mail exchanged yet</p>
          </div> :
          <ChatList
            chats={chats}
            groups={groupChats}
            showChat={openChat}
            showGroup={openGroup}
          />
        }
      </main>
    </aside >
  )
};

