import { MainLayout } from "@/layouts/MainLayout"
import { Sidebar } from "../Sidebar/Sidebar"
import { MainContent } from "../Main/MainContent"
import { useHomeNavigation } from "./hooks/useHomeNavigation"
import type { HomeLoaderReturn } from "./Home.loader"
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import { MessagePill } from "@/components/MessagePill"

export type Message = {
  type: "error" | "success" | "any",
  body?: string,
}
export function Home() {
  const loaderData = useLoaderData<HomeLoaderReturn>();
  const [message, setMessage] = useState<Message | null>();
  const [showSB, setShowSB] = useState(true);

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(t)
  }, [message])

  const nav = useHomeNavigation(loaderData, {
    onError: (msg: string) => setMessage({ type: "error", body: msg }),
    onMessage: (msg: string) => setMessage({ type: "success", body: msg }),
  })

  return (
    <MainLayout
      className={showSB ? "grid grid-cols-[25vw_1fr]" : "grid grid-cols-[auto_1fr]"}
      isLoading={nav.isLoading}
    >
      <Sidebar
        data={loaderData}
        nav={nav}
        toggleSidebar={() => setShowSB((prev) => !prev)}
        isHidden={!showSB}
      />
      <MainContent
        profilePictures={loaderData.assets.profilePictures}
        nav={nav}
      />
      {message &&
        <MessagePill
          message={message}
          className="absolute right-5 bottom-5 m-2 min-w-[100px]"
        />
      }
    </MainLayout>
  )
}
