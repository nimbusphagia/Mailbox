import { MainLayout } from "@/layouts/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout, type FMessage } from "@/layouts/RootLayout";
import { useFetcher, useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";
import { useEffect, useState } from "react";
import { NewMessageModal } from "@/components/NewMessageModal/NewMessageModal";
import type { ActionReturn } from "./Home.action";
import type { ErrorMessage } from "@/lib/utils";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const [showNM, setShowNM] = useState<boolean>(false);
  const [leftFM, setLeftFM] = useState<FMessage | undefined>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);
  const fetcher = useFetcher<ActionReturn | ErrorMessage>();


  useEffect(() => {
    const data = fetcher.data;
    if (!data) return;
    if ("error" in data) {
      setLeftFM({ message: data.error, color: "red" });
      return;
    }
    if (data.intent === "getUsers") {
      refreshUsers(data.data.contacts, data.data.users);
      return;
    }
    if (data.intent === "addContact") {
      refreshUsers(data.data.contacts, data.data.users);
      setLeftFM({ message: "Added new contact." })
    }
  }, [fetcher.data]);

  useEffect(() => {
    setTimeout(() => setLeftFM(undefined), 5000);
  }, [leftFM])

  const refreshUsers = (contacts: Contact[], users: SafeUser[]) => {
    setContacts(contacts);
    const contactUserIds = new Set(contacts.map((c) => c.user?.id || c.isBlocked));
    const filteredUsers = users.filter(
      (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id)
    );
    setUsers(filteredUsers);
  }
  const loadUsers = () => {
    fetcher.submit(
      { intent: "getUsers" },
      { method: "post", action: "" }
    );
    setShowNM(true);
  };
  const addContact = (userId: UuidType) => {
    fetcher.submit(
      { intent: "addContact", userId, },
      { method: "post", action: "" }
    );
  }
  const createChat = (contactId: UuidType) => {
    fetcher.submit(
      { intent: "createChat", contacts: [contactId], },
      { method: "post", action: "" }
    );
  }
  const createGroup = (contacts: UuidType[]) => {
    fetcher.submit(
      { intent: "createGroup", contacts },
      { method: "post", action: "" }
    );
  }
  return (
    <RootLayout
      route="home"
      color="blue"
      left={leftFM ?? undefined}
    >
      <MainLayout
        aside={
          <Sidebar
            data={loaderData}
            loadUsers={loadUsers}
          />
        }
        main={<Chat />}
      >
        {showNM &&
          <NewMessageModal
            hideFn={() => setShowNM(false)}
            contacts={contacts}
            users={users}
            addContactFn={addContact}
            createChatFn={createChat}
            createGroupFn={createGroup}
          />}
      </MainLayout>
    </RootLayout>

  )
}
