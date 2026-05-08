import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { useFetcher, useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";
import { useEffect, useState } from "react";
import { NewMessageModal } from "@/components/NewMessageModal/NewMessageModal";
import type { ActionReturn } from "./Home.action";
import type { ErrorMessage } from "@/lib/utils";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const [showNM, setShowNM] = useState<boolean>(false);
  const [rightFM, setRightFM] = useState<string | undefined>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);
  const fetcher = useFetcher<ActionReturn | ErrorMessage>();


  useEffect(() => {
    const data = fetcher.data;
    if (!data) return;
    if ("error" in data) {
      setRightFM(data.error);
      return;
    }
    if (data.intent === "getUsers") {
      setContacts(data.data.contacts);
      const contactUserIds = new Set(data.data.contacts.map((c) => c.user?.id));
      const filteredUsers = data.data.users.filter(
        (u) => u.id !== loaderData.user.id && !contactUserIds.has(u.id)
      );
      setUsers(filteredUsers);
      return;
    }
  }, [fetcher.data]);

  const loadUsers = () => {
    fetcher.submit(
      { intent: "getUsers", userId: loaderData.user.id },
      { method: "post", action: "" }
    );
    setShowNM(true);
  };
  return (
    <RootLayout
      route="home"
      color="blue"
      right={rightFM ? { message: rightFM, color: "red" } : undefined}
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
          />}
      </MainLayout>
    </RootLayout>

  )
}
