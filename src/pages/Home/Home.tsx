import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chat } from "../Chat/Chat";

export function Home() {
  return (
    <MainLayout
      aside={<Sidebar />}
      main={<Chat />}
    />
  )
}
