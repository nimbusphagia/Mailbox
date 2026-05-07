import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";
import { useState } from "react";
import { NewMessageModal } from "@/components/ui/newMessageModal";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const [showNM, setShowNM] = useState<boolean>(false);
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
          />}
      </MainLayout>
    </RootLayout>

  )
}
