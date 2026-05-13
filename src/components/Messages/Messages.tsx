import type { Message } from "@/lib/schemas/message.schema"
import { MessageComponent } from "../Message/Message"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { type RefObject } from "react"

type Props = {
  messages: Message[],
  primary: SafeUser,
  secondary: SafeUser,
  focusRef: RefObject<HTMLDivElement | null>
}
export function Messages({ messages, primary, secondary, focusRef }: Props) {
  return (
    <div className=" h-full p-2 overflow-y-scroll flex flex-col gap-2.5">
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
