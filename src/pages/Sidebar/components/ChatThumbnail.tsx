import {
  Avatar, AvatarImage
} from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import type { ChatEntry } from "@/lib/schemas/util.schema";
import { Mailbox } from "lucide-react";

type Props = {
  isActive: boolean,
  entry: ChatEntry,
  isGroup: boolean,
  onClick?: () => void
};

export function ChatThumbnail({ isActive, entry, onClick }: Props) {
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
    : "This chat is empty.";

  return (
    <div
      className={`relative flex items-center gap-3 px-3 py-2 m-1 bg-fg1/20 
    rounded-md cursor-pointer hover:bg-fg1/80  border-[1px] 
      shadow-sm
      ${isActive ? "border-bg2 hover:border-bg2/80 bg-fg1/60!" : "border-fg4 hover:border-bg3"}
      `}
      onClick={onClick}
    >
      {
        !entry.data.isRead &&
        <div className="absolute -top-1.5 -right-1.5 bg-fg3 p-1 rounded-full border-[1px] border-bg4 w-[23px]">
          <Mailbox className="text-bg4 w-full h-auto" />
        </div>
      }
      <Avatar className="w-[18%] h-auto border-bg3 border-[1px]">
        <AvatarImage src={avatarSrc} className="bg-fg4" />
      </Avatar>
      <div className="flex flex-1 flex-col gap-[0.1em] overflow-x-hidden">
        <div className="flex justify-between items-center ">
          <h4 className={`text-sm font-bold text-left truncate max-w-[65%] ${isActive ? "text-bg1" : "text-bg1/90"}`}>{displayName}</h4>
          <p className="text-[0.55em]">{timeAgo(data.lastMessage?.createdAt ?? data.createdAt)}</p>
        </div>
        <div className="flex items-center">
          <p className={`text-[0.65em] font-normal text-left line-clamp-2 ${isActive ? "text-bg1" : "text-bg3"}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
