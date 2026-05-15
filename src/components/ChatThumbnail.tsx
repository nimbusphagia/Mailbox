import { Avatar } from "./ui/avatar"
import { AvatarImage } from "./ui/avatar"
import { timeAgo } from "@/lib/utils";
import type { ChatLazy } from "@/lib/schemas/chat.schema";

type Props = {
  chat: ChatLazy,
}
export function ChatThumbnail({ chat }: Props) {
  const { otherMember, lastMessage } = chat;

  const message = lastMessage
    ? lastMessage.type === 'TEXT'
      ? lastMessage.content ?? "..."
      : "Media sent"
    : "This mailbox is empty";
  return (
    <div className="flex items-center gap-2.5 p-3 bg-fg4/30 border-t-1 border-bg3 cursor-pointer hover:bg-fg4/70">
      <Avatar size="lg">
        <AvatarImage
          src={otherMember.imgUrl}
        />
      </Avatar>
      <div className="flex flex-1 flex-col  ">
        <div className="flex justify-between items-center">
          <h4 className="text-md text-bg0 font-bold">{otherMember.nickname ?? otherMember.name}</h4>
          <p className="text-[0.6em]">{timeAgo(lastMessage?.createdAt ?? chat.createdAt)}</p>
        </div>
        <div className="flex-1 flex items-center">
          <p className="text-xs text-bg2 font-bold text-left">{message}</p>
        </div>
      </div>
    </div>
  )

}

