import type { ChatType } from "@/lib/schemas/chat.schema";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { homeActionsReturn } from "../Hooks/useHomeActions";
import { Welcome } from "@/components/ui/Welcome";
import { ContactPage } from "../Contact/Contact";
import { Chat } from "../Chat/Chat";

type Props = {
  chat?: ChatType;
  contact?: ContactType | null;
  actions: homeActionsReturn;
}
export function MainContent({
  chat,
  contact,
  actions,
}: Props) {
  if (!chat) return (
    <div className="bg-fg4/68 w-full h-full flex items-center justify-center">
      <Welcome className="text-[30px] text-fg1/80 font-bold select-none" />
    </div>
  );
  if (contact) return <ContactPage contact={contact} />;
  return (
    <Chat
      chat={chat}
      sendFn={actions.createMessage}
      showContact={actions.getContact}
    />
  );
}

