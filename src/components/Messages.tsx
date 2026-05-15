import { MessageComponent } from "./Message"
import { type RefObject } from "react"
import { ChatInit } from "./ChatInit"
import type { ChatType } from "@/lib/schemas/chat.schema"

type Props = {
  chat: ChatType,
  focusRef: RefObject<HTMLDivElement | null>
}
export function Messages({ chat, focusRef }: Props) {
  const { messages, primaryMember: primary, secondaryMember: secondary, createdAt } = chat;
  return (
    <div className=" h-full px-5 pt-4 pb-2 overflow-y-scroll flex flex-col gap-2.5">
      <ChatInit
        contact={secondary}
        createdAt={createdAt}
      />
      {messages.map((m, i) => {
        return (
          <MessageComponent
            key={m.id}
            message={m}
            primary={primary}
            secondary={secondary}
            reference={i === messages.length - 1 ? focusRef : undefined}
          />
        )
      })}
    </div>
  )
}
