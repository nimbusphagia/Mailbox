import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { useActionData, useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";
import { useEffect, useState } from "react";
import { NewMessageModal } from "@/components/NewMessageModal/NewMessageModal";
import type { ActionReturn } from "./Home.action";
import type { ErrorMessage } from "@/lib/utils";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const actionData = useActionData<ActionReturn | ErrorMessage | undefined>();
  const [showNM, setShowNM] = useState<boolean>(false);
  const [rightFM, setRightFM] = useState<string | undefined>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);

  useEffect(() => {
    if (!actionData) return;

    if ("error" in actionData) {
      setRightFM(actionData.error);
      return;
    }

    if (actionData.intent === "getContacts") {
      setContacts(actionData.data);
      return
    }
    if (actionData.intent === "getUsers") {
      setContacts(actionData.data.contacts);
      setUsers(actionData.data.users);
      return
    }
  }, [actionData]);

  return (
    <RootLayout
      route="home"
      color="blue"
    >
      <MainLayout
        aside={
          <Sidebar
            data={loaderData}
            toggleModal={() => { setShowNM(!showNM) }}
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
