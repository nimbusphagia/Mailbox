import { MainLayout } from "@/layouts/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { RootLayout, type FMessage } from "@/layouts/RootLayout";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewMessageModal } from "@/components/NewMessageModal";
import type { HomeLoaderReturn } from "./Home.loader";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { ChatType } from "@/lib/schemas/chat.schema";
import { useHomeFetcher } from "../Hooks/useHomeFetcher";
import { useHomeActions } from "../Hooks/useHomeActions";
import { MainContent } from "../Main/MainContent";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();

  const [flash, setFlash] = useState<FMessage | undefined>();
  const [view, setView] = useState<{ chat?: ChatType; contact?: ContactType | null }>({});
  const [modal, setModal] = useState<{ show: boolean; contacts: ContactType[]; users: SafeUser[] }>({
    show: false, contacts: [], users: [],
  });

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(undefined), 8000);
    return () => clearTimeout(t);
  }, [flash]);

  const fetcher = useHomeFetcher({
    onError: (message) => setFlash({ message, color: "red" }),
    onMessage: (message) => setFlash({ message }),
    onRefreshUsers: (contacts, users) => {
      const contactUserIds = new Set(contacts.map((c) => c.user?.id || c.isBlocked));
      const filteredUsers = users.filter(
        (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id)
      );
      setModal((prev) => ({ ...prev, contacts, users: filteredUsers }));
    },
    onChatOpened: (chat) => setView({ chat }),
    onChatCreated: (chat) => { setView({ chat }); setModal((prev) => ({ ...prev, show: false })); },
    onContactOpened: (contact) => setView((prev) => ({ ...prev, contact })),
  });

  const actions = useHomeActions(fetcher);

  return (
    <RootLayout route="home" color="blue" left={flash}>
      <MainLayout
        aside={
          <Sidebar
            data={loaderData}
            loadUsers={() => { actions.loadUsers(); setModal((prev) => ({ ...prev, show: true })); }}
            openChat={(id) => { actions.openChat(id); setView((prev) => ({ ...prev, contact: null })); }}
          />
        }
        main={<MainContent chat={view.chat} contact={view.contact} actions={actions} />}
      >
        {modal.show &&
          <NewMessageModal
            hideFn={() => setModal((prev) => ({ ...prev, show: false }))}
            contacts={modal.contacts}
            users={modal.users}
            addContactFn={actions.addContact}
            createChatFn={actions.createChat}
            createGroupFn={actions.createGroup}
          />}
      </MainLayout>
    </RootLayout>
  );
}
