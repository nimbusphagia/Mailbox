import { Messages } from "@/components/Messages/Messages"
import { Button } from "@/components/ui/button"
import { UserThumbnail } from "@/components/UserThumbnail/UserThumbnail"
import type { ChatType } from "@/lib/schemas/chat.schema"
import type { MessageCreate } from "@/lib/schemas/message.schema"
import { Mailbox } from "lucide-react"
import { useState } from "react"

type Props = {
  chat: ChatType,
  sendFn: (message: MessageCreate) => void
}
export function Chat({ chat, sendFn }: Props) {
  const [textValue, setTextValue] = useState<string>("");
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
    <main className="flex-1 bg-fg4/68 grid grid-rows-[8%_1fr_auto] w-full h-full text-bg1">
      <div className="bg-fg3/92 flex items-center justify-between p-3">
        <UserThumbnail
          imgUrl={chat.secondaryMember?.imgUrl!}
          fullName={chat.secondaryMember?.name!}
          className="text-[1.2em] text-bg0"
        />
        <div>...</div>
      </div>
      <div>
        <Messages
          messages={chat.messages}
          primary={chat.primaryMember}
          secondary={chat.secondaryMember} />
      </div>
      <div className="flex items-center m-3 gap-2 flex-1 p-1 bg-fg4 rounded-xs shadow-xs shadow-fg4 text-fg1"  >
        <Button className="bg-fg4 self-end text-md text-bg2">+</Button>
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
          className="bg-fg4/90 p-1 px-2 text-sm font-bold w-full outline-none text-bg2
          focus:bg-fg3/70 focus:placeholder:text-bg2 focus:text-bg2 rounded-xs"
        />
        <Button
          className="bg-fg4 self-end text-md text-bg2"
          disabled={!textValue?.length}
          onClick={submitText}
        >
          <Mailbox className="text-bg0 size-md" />
        </Button>
      </div>
    </main >
  )
}
