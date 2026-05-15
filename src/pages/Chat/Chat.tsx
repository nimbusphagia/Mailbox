import { Messages } from "@/components/Messages"
import { Button } from "@/components/ui/button"
import { UserThumbnail } from "@/components/UserThumbnail"
import type { ChatType } from "@/lib/schemas/chat.schema"
import type { MessageCreate } from "@/lib/schemas/message.schema"
import { Mailbox } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  chat: ChatType,
  sendFn: (message: MessageCreate) => void
}
export function Chat({ chat, sendFn }: Props) {
  const [textValue, setTextValue] = useState<string>("");
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    focusRef.current?.focus();
  }, [chat]);


  const submitText = () => {
    if (textValue?.length) {
      const message = {
        chatId: chat.id,
        type: "TEXT" as const,
        content: textValue,
      };
      sendFn(message);
      setTextValue("");
    }
  }
  return (
    <main className="box-border flex-1 min-h-0 bg-fg3/90 size-full grid grid-rows-[8%_82%_10%] text-bg1">
      <div className="bg-fg3/92 flex items-center justify-between p-3">
        <UserThumbnail
          imgUrl={chat.secondaryMember?.imgUrl!}
          fullName={chat.secondaryMember?.name!}
          className="text-[1.2em] text-bg0"
        />
        <div>...</div>
      </div>
      <div className="flex flex-col gap-2">
        <Messages
          messages={chat.messages}
          primary={chat.primaryMember}
          secondary={chat.secondaryMember}
          focusRef={focusRef}
        />
      </div>
      <div className="flex items-center m-3 gap-2 flex-1 p-1 bg-bg4/30 rounded-xs shadow-xs shadow-fg4"  >
        <Button className=" text-md text-bg2">+</Button>
        <input
          placeholder=":message"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitText();
            }
          }}
          className="p-1 px-3 text-sm font-bold w-full outline-none text-bg1
          focus:bg-fg3/70 focus:placeholder:text-bg2 focus:text-bg1 rounded-xs"
        />
        <Button
          className=" text-md text-bg2"
          disabled={!textValue?.length}
          onClick={submitText}
        >
          <Mailbox className="text-bg0 size-md" />
        </Button>
      </div>
    </main >
  )
}
