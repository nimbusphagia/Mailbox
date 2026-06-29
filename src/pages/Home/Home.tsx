import { MainLayout } from "@/layouts/MainLayout"
import { Sidebar } from "../Sidebar/Sidebar"
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
        nav={nav}
        toggleSidebar={() => setShowSB((prev) => !prev)}
        isHidden={!showSB}
      />
      <MainContent
        profilePictures={loaderData.assets.profilePictures}
        user={nav.userInfo}
        showProfile={nav.showUserInfo}
        hideProfile={nav.hideProfile}
        chat={nav.activeChat ?? undefined}
        contact={nav.activeContact}
        showInfo={nav.showInfo}
        onShowInfo={() => nav.setShowInfo(true)}
        actions={nav.actions}
        closeChat={nav.closeChat}
        closeInfo={nav.closeInfo}
        editNickname={nav.actions.editNickname}
        isLoading={nav.isLoading}
        isEmpty={nav.emptyMain}
      />
    </MainLayout>
  )
}
