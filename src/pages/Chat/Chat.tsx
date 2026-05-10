import { Button } from "@/components/ui/button"
import { UserThumbnail } from "@/components/UserThumbnail/UserThumbnail"
import type { ChatType } from "@/lib/schemas/chat.schema"
import { Mailbox } from "lucide-react"

type Props = {
  chat: ChatType,
}
export function Chat({ chat }: Props) {
  return (
    <main className="flex-1 bg-fg4/68 grid grid-rows-[8%_1fr_auto] w-full h-full text-bg1">
      <div className="bg-fg3/92 flex items-center justify-between p-3">
        <UserThumbnail
          imgUrl={chat.members[1].user?.imgUrl!}
          fullName={chat.members[1].user?.name!}
          className="text-[1.2em] text-bg0"
        />
        <div>...</div>
      </div>
      <div>
        MESSAGES
      </div>
      <div className="flex items-center m-3 gap-2 flex-1 p-1 bg-fg4 rounded-xs shadow-xs shadow-fg4 text-fg1"  >
        <Button className="bg-fg4 self-end text-md text-bg2">+</Button>
        <input
          placeholder=":message"
          className="bg-fg4/90 p-1 px-2 text-sm font-bold w-full outline-none text-bg2
          focus:bg-fg3/70 focus:placeholder:text-bg2 focus:text-bg2 rounded-xs "
        />
        <Button className="bg-fg4 self-end text-md text-bg2">
          <Mailbox className="text-bg0 size-md" />
        </Button>
      </div>
    </main >
  )
}
