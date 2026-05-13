import type { ChatLazy } from "@/lib/schemas/chat.schema";
import { ChatThumbnail } from "../ChatThumbnail/ChatThumbnail";
import type { UuidType } from "@/lib/schemas/util.schema";

type Props = {
  chats: ChatLazy[],
  showFn: (chatId: UuidType) => void,
}
export function ChatList({ chats, showFn }: Props) {
  return (
    <>
      {chats.map((c) =>
        <div
          className="h-fit border-b-1 border-bg3"
          onClick={() => showFn(c.id)}
          key={c.id}
        >
          <ChatThumbnail
            key={c.id}
            chat={c}
          />
        </div>
      )
      }
    </>

  )
}
