import { Package, MessagesSquare, MoveDiagonal2, NotebookTabs, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SidebarView } from "../Sidebar";

type Props = {
  toggleSidebar: () => void,
  openConfig: () => void,
  openChatList: (regular: boolean) => void,
  openContacts: () => void,
  active: SidebarView,
}

const ACTIVE_CLASSES = "bg-fg3 text-bg4! shadow-xs";

export function SidebarHeader({ toggleSidebar, openConfig, openChatList, openContacts, active }: Props) {


  return (
    <header className="max-h-fit flex items-center justify-between rounded-sm m-2
    *:text-bg1 *:size-[2.5em] [&>button>*]:size-full *:rounded-full">
      <Button
        onClick={toggleSidebar}
      >
        <MoveDiagonal2 />
      </Button>
      <Button
        onClick={() => openChatList(true)}
        className={active === "chats" ? ACTIVE_CLASSES : ""}
      >
        <MessagesSquare />
      </Button>
      <Button
        onClick={() => openChatList(false)}
        className={active === "archived" ? ACTIVE_CLASSES : ""}
      >
        <Package />
      </Button>
      <Button
        onClick={openContacts}
        className={active === "contacts" ? ACTIVE_CLASSES : ""}
      >
        <NotebookTabs />
      </Button>
      <Button
        onClick={openConfig}
        className={active === "config" ? ACTIVE_CLASSES : ""}
      >
        <Settings />
      </Button>
    </header>
  )
}
