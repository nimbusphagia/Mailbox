import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { useLoaderData } from "react-router-dom";
import type { HomeLoaderReturn } from "./Home.loader";

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  return (
    <RootLayout
      route="home"
      color="blue"
    >
      <MainLayout
        aside={
          <Sidebar
            data={loaderData}
          />
        }
        main={<Chat />}
      />
    </RootLayout>

  )
}
