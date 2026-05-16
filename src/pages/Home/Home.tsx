import { MainLayout } from "@/layouts/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout, type FMessage } from "@/layouts/RootLayout";
import { useFetcher, useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";
import { useEffect, useState } from "react";
import { NewMessageModal } from "@/components/NewMessageModal";
import type { ActionReturn } from "./Home.action";
import type { ErrorMessage } from "@/lib/utils";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { ChatType } from "@/lib/schemas/chat.schema";
import { Welcome } from "@/components/ui/Welcome";
import type { MessageCreate } from "@/lib/schemas/message.schema";
import { ContactPage } from "../Contact/Contact";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const [openedChat, setOpenedChat] = useState<ChatType | undefined>();
  const [openedContact, setOpenedContact] = useState<ContactType | null>(null);
  const [showNM, setShowNM] = useState<boolean>(false);
  const [leftFM, setLeftFM] = useState<FMessage | undefined>();
  const [contacts, setContacts] = useState<ContactType[]>([]);
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
      return;
    }
    if (data.intent === "createChat") {
      setLeftFM({ message: "Created new chat." })
      setShowNM(false);
      setOpenedChat(data.data.chat);
      return;
    }
    if (data.intent === "getChat") {
      setOpenedChat(data.data.chat);
      return;
    }
    if (data.intent === "createMessage") {
      setOpenedChat(data.data.chat);
      return;
    }
    if (data.intent === "getContact") {
      setOpenedContact(data.data.contact);
      return;
    }
  }, [fetcher.data]);

  useEffect(() => {
    setTimeout(() => setLeftFM(undefined), 8000);
  }, [leftFM])

  const refreshUsers = (contacts: ContactType[], users: SafeUser[]) => {
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
      { method: "post", action: "", encType: "application/json" }
    );
    setShowNM(true);
  };
  const addContact = (userId: UuidType) => {
    fetcher.submit(
      { intent: "addContact", userId, },
      { method: "post", action: "", encType: "application/json" }
    );
  }
  const createChat = (contactId: UuidType) => {
    fetcher.submit(
      { intent: "createChat", contacts: [contactId] },
      { method: "post", action: "", encType: "application/json" }
    );
  }
  const createGroup = (contacts: UuidType[]) => {
    fetcher.submit(
      { intent: "createGroup", contacts },
      { method: "post", action: "", encType: "application/json" }
    );
  }
  const openChat = (chatId: UuidType) => {
    fetcher.submit(
      { intent: "getChat", chatId },
      { method: "post", action: "", encType: "application/json" }
    );
  }
  const createMessage = (message: MessageCreate) => {
    fetcher.submit(
      { intent: "createMessage", message },
      { method: "post", action: "", encType: "application/json" }
    );
  }
  const getContact = (userId: UuidType) => {
    fetcher.submit(
      { intent: "getContact", userId },
      { method: "post", action: "", encType: "application/json" }
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
            openChat={openChat}
          />
        }
        main={
          openedChat ?
            (openedContact ?
              <ContactPage
                contact={openedContact}
              /> :
              <Chat
                chat={openedChat}
                sendFn={createMessage}
                showContact={getContact}
              />)
            :
            <div className="bg-fg4/68 w-full h-full flex items-center justify-center">
              <Welcome className="text-[30px] text-fg1/80 font-bold select-none" />
            </div>
        }
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
