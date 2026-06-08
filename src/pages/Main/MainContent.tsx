import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { homeActionsReturn } from "../Hooks/useHomeActions";
import { Welcome } from "@/components/ui/Welcome";
import { ContactPage } from "../Contact/Contact";
import { Chat } from "../Chat/Chat";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";

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
  if (!chat) return (
    <div className="bg-fg4/68 w-full h-full flex items-center justify-center">
      <Welcome className="text-[30px] text-fg1/80 font-bold select-none" />
    </div>
  );
  if (contact) return (
    <ContactPage
      contact={contact}
      hideFn={() => closeContact(chat.id)}
      nicknameFn={editNickname}
    />
  );
  return (
    <Chat
      chat={chat}
      sendFn={actions.createMessage}
      showContact={actions.getContact}
    />
  );
}

