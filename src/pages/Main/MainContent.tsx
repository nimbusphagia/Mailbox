import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { homeActionsReturn } from "../Hooks/useHomeActions";
import { Welcome } from "@/components/ui/Welcome";
import { ContactPage } from "../ChatInfo/Contact";
import { Chat } from "../Chat/Chat";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import { useEffect, useState } from "react";
import { GroupPage } from "../ChatInfo/Group";

type Props = {
  chat?: ChatRes | GroupRes,
  contact?: ContactType | null,
  actions: homeActionsReturn,
  closeContact: (id: UuidType) => void,
  editNickname: (id: UuidType, nickname: string | null) => void,
}
export function MainContent({
  chat,
  contact,
  actions,
  closeContact,
  editNickname,
}: Props) {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    setShowInfo(false);
  }, [chat]);

  if (!chat) return (
    <div className="bg-fg4/68 w-full h-full flex items-center justify-center">
      <Welcome className="text-[30px] text-fg1/80 font-bold select-none" />
    </div>
  );
  if (contact && showInfo) return (
    <ContactPage
      contact={contact}
      images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
      hideFn={() => closeContact(chat.id)}
      nicknameFn={editNickname}
    />
  );
  if (chat.isGroup && showInfo) return (
    <GroupPage
      group={chat as GroupRes}
      images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
      hideFn={() => setShowInfo(false)}
      titleFn={editNickname}
    />
  );
  return (
    <Chat
      chat={chat}
      sendFn={actions.createMessage}
      getContact={actions.getContact}
      showInfo={() => setShowInfo(true)}
    />
  );
}

