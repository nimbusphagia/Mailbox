import { Avatar } from "./ui/avatar"
import { AvatarImage } from "./ui/avatar"
import { timeAgo } from "@/lib/utils";
import type { ChatEntry } from "@/lib/schemas/util.schema";

type Props = {
  entry: ChatEntry,
  isGroup: boolean,
  onClick?: () => void
};

export function ChatThumbnail({ entry, onClick }: Props) {
  const { type, data } = entry;

  const displayName = type === "dm"
    ? (data.otherMember.nickname ?? data.otherMember.name)
    : data.name;

  const avatarSrc = type === "dm"
    ? data.otherMember.imgUrl
    : data.imgUrl;

  const message = data.lastMessage
    ? data.lastMessage.type === "TEXT"
      ? data.lastMessage.content ?? "..."
      : "Media sent"
    : "This mailbox is empty";

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 m-1 bg-fg2 
    rounded-md cursor-pointer hover:bg-fg1/80 border-bg3 border-[1px] 
      shadow-sm"
      onClick={onClick}
    >
      <Avatar className="w-[18%] h-auto">
        <AvatarImage src={avatarSrc} className="bg-fg4" />
      </Avatar>
      <div className="flex flex-1 flex-col gap-[0.1em] overflow-x-hidden">
        <div className="flex justify-between items-center ">
          <h4 className="text-sm text-bg1 font-bold text-left truncate max-w-[65%]">{displayName}</h4>
          <p className="text-[0.55em]">{timeAgo(data.lastMessage?.createdAt ?? data.createdAt)}</p>
        </div>
        <div className="flex items-center">
          <p className="text-[0.65em] text-bg3 font-normal text-left line-clamp-2">{message}</p>
        </div>
      </div>
    </div>
  );
}
