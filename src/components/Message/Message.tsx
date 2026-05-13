import type { Message } from "@/lib/schemas/message.schema"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { NameTag } from "../ui/NameTag";
import type { RefObject } from "react";

type Props = {
  message: Message,
  primary: SafeUser,
  secondary: SafeUser,
  reference?: RefObject<HTMLDivElement | null>,
}

export function MessageComponent({ message, primary, secondary, reference }: Props) {
  const isPrimary = message.senderId === primary.id;
  return (
    <div
      className={` w-full flex  ${isPrimary ? "justify-end" : "justify-start"}`}
      ref={reference ?? undefined}
    >
      <div className={`
        bg-fg2 min-w-[25%] max-w-[80%] py-1.5 px-4 pb-3 rounded-xs
        text-sm flex flex-col gap-0 font-medium 
        ${isPrimary ? "items-end" : "items-start"}
        `}>
        <div className=" flex gap-[0.2em] items-center ">
          {isPrimary ?
            <NameTag
              name={primary.name}
              color="text-blue"
              date={message.createdAt}
              facing="right"
            />
            :
            <NameTag
              name={secondary.name}
              color="text-orange"
              date={message.createdAt}
              facing="left"
            />}

        </div>
        <div >
          <p className={`text-pretty ${isPrimary ? "text-right" : "text-left"}`}>{message.content}</p>
        </div>

      </div>
    </div>
  )
}

