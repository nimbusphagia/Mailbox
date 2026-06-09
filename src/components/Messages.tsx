import { MessageComponent } from "./Message"
import { useMemo, type RefObject } from "react"
import { ChatInit } from "./ChatInit"
import type { ChatMember, SafeUser } from "@/lib/schemas/user.schema"
import type { Message } from "@/lib/schemas/message.schema"

type Props = {
  isGroup: boolean,
  title?: string,
  imgUrl?: string,
  messages: Message[],
  primary: SafeUser,
  secondary: ChatMember | null,
  secondaryMembers: ChatMember[],
  createdAt: Date,
  focusRef: RefObject<HTMLDivElement | null>,
  replyFn: (m: Message, name: string) => void,
}
export function Messages({ isGroup, title, imgUrl, messages, primary, secondary, secondaryMembers, createdAt, focusRef, replyFn }: Props) {
  const memberMap = useMemo(() =>
    new Map(secondaryMembers.map((m) => [m.id, m])),
    [secondaryMembers]
  );

  return (
    <div className="h-full px-5 pt-1 pb-2 overflow-y-scroll flex flex-col gap-2.5">
      <ChatInit
        title={isGroup ? title! : secondary?.nickname ?? secondary?.name!}
        imgUrl={isGroup ? imgUrl! : secondary?.imgUrl!}
        createdAt={createdAt}
      />
      {messages.map((m, i) => (
        <MessageComponent
          key={m.id}
          message={m}
          primary={primary}
          secondary={isGroup ? memberMap.get(m.senderId!) ?? null : secondary}
          reference={i === messages.length - 1 ? focusRef : undefined}
          replyFn={replyFn}
        />
      ))}
    </div>
  )
}
