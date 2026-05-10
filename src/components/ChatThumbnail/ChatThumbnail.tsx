import { Avatar } from "../ui/avatar"
import { AvatarImage } from "../ui/avatar"
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
    <div className="flex items-center gap-5 p-3 bg-bg4/70 cursor-pointer hover:bg-bg4">
      <Avatar size="lg">
        <AvatarImage
          src={otherMember.imgUrl}
        />
      </Avatar>
      <div className="flex flex-1 flex-col gap-1 ">
        <div className="flex justify-between items-center">
          <h4 className="text-md text-bg1 font-bold">{otherMember.name}</h4>
          <p className="text-[0.6em]">{timeAgo(lastMessage?.createdAt ?? chat.createdAt)}</p>
        </div>
        <div className="flex-1 flex items-center">
          <p className="text-xs text-bg2/80 font-bold">{message}</p>
        </div>
      </div>
    </div>
  )

}

