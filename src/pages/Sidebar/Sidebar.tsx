import { SquarePlus, Package } from "lucide-react"
import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import type { HomeLoaderReturn } from "../Home/Home.loader";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/ChatList/ChatList";

type SidebarProps = {
  data: HomeLoaderReturn,
  loadUsers: () => void,
}
export function Sidebar({ data, loadUsers }: SidebarProps) {
  const { user, chats } = data;
  return (
    <aside className="flex flex-col  bg-bg4/70 text-bg1 font-semibold">
      <header className="bg-fg4  p-2 grid grid-cols-[10%_1fr_auto] text-center *:flex *:items-center">
        <Avatar size="lg">
          <AvatarImage
            src={user.imgUrl}
          />
        </Avatar>
        <div className="self-center justify-center">
          <h2>MailBox</h2>
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
          className="bg-fg4/70 p-1 px-2 text-sm  w-full outline-none focus:bg-fg4/30 focus:text-blue-dark/60"
        />
      </div>
      <main className="flex-1 flex flex-col text-center max-w-full max-h-full overflow-scroll">
        {chats.length === 0 ?
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-sm text-bg1">No mail exchanged yet</p>
          </div> :
          <ChatList
            chats={chats}
          />
        }
      </main>
    </aside >
  )
};

