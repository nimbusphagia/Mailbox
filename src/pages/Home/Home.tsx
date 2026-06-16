import { MainLayout } from "@/layouts/MainLayout"
import { Sidebar } from "../Sidebar/Sidebar"
import { ChatPrompt } from "../ChatPrompt/ChatPrompt"
import { MainContent } from "../Main/MainContent"
import { useHomeNavigation } from "./hooks/useHomeNavigation"
import type { HomeLoaderReturn } from "./Home.loader"
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>()
  const [flash, setFlash] = useState<string | undefined>()
  const [showSB, setShowSB] = useState(true)

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(undefined), 8000)
    return () => clearTimeout(t)
  }, [flash])

  const nav = useHomeNavigation(loaderData, {
    onError: setFlash,
    onMessage: setFlash,
  })

  return (
    <MainLayout
      className={showSB ? "grid grid-cols-[25vw_1fr]" : "grid grid-cols-[auto_1fr]"}>
      <Sidebar
        data={loaderData}
        loadUsers={() => nav.actions.loadUsers()}
        openChat={nav.openChat}
        openGroup={nav.openGroup}
        toggleSidebar={() => setShowSB((prev) => !prev)}
        isHidden={!showSB}
      />
      <MainContent
        chat={nav.activeChat ?? undefined}
        contact={nav.activeContact}
        showInfo={nav.showInfo}
        onShowInfo={() => nav.setShowInfo(true)}
        actions={nav.actions}
        closeChat={nav.closeChat}
        closeInfo={nav.closeInfo}
        editNickname={nav.actions.editNickname}
      />
      {nav.showModal && (
        <ChatPrompt
          hideFn={nav.closeModal}
          contacts={nav.modalData.contacts}
          users={nav.modalData.users}
          addContactFn={nav.actions.addContact}
          createChatFn={nav.actions.createChat}
          createGroupFn={nav.actions.createGroup}
        />
      )}
    </MainLayout>
  )
}
