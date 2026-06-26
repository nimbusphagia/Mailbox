import { Package, MessagesSquare, MoveDiagonal2, UserCog, NotebookTabs } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  toggleSidebar: () => void,
  showProfile: () => void,
  openChatList: (regular: boolean) => void,
  openContacts: () => void,
}

export function SidebarHeader({ toggleSidebar, showProfile, openChatList, openContacts }: Props) {
  return (
    <header className="max-h-fit flex items-center justify-between rounded-sm m-2
    *:text-bg1 *:size-[2.5em] [&>button>*]:size-full *:rounded-full">
      <Button
        onClick={toggleSidebar}
      >
        <MoveDiagonal2 />
      </Button>
      <Button
        onClick={showProfile}>
        <UserCog />
      </Button>
      <Button
        onClick={() => openChatList(true)}
      >
        <MessagesSquare />
      </Button>
      <Button
        onClick={() => openChatList(false)}
      >
        <Package />
      </Button>

      <Button
        onClick={openContacts}>
        <NotebookTabs />
      </Button>
    </header>
  )
}
