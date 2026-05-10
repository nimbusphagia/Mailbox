import type { ChatLazy } from "@/lib/schemas/chat.schema";
import { ChatThumbnail } from "../ChatThumbnail/ChatThumbnail";

type Props = {
  chats: ChatLazy[],
}
export function ChatList({ chats }: Props) {
  return (
    <div>
      {chats.map((c) =>
        <ChatThumbnail
          key={c.id}
          chat={c}
        />
      )
      }
    </div>

  )
}
