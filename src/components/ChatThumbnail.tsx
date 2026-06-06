import { Avatar } from "./ui/avatar"
import { AvatarImage } from "./ui/avatar"
import { timeAgo } from "@/lib/utils";
import type { ChatEntry } from "@/lib/schemas/util.schema";

type Props = {
  entry: ChatEntry,
  isGroup: boolean,
};

export function ChatThumbnail({ entry }: Props) {
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
    <div className="flex items-center max-h-20 overflow-y-hidden gap-2.5 p-3 bg-fg4/30 border-b-2 border-bg3 cursor-pointer hover:bg-fg4/70">
      <Avatar size="lg">
        <AvatarImage src={avatarSrc} className="bg-fg4 border-1 border-fg3" />
      </Avatar>
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4 className="text-md text-bg0 font-bold">{displayName}</h4>
          <p className="text-[0.6em]">{timeAgo(data.lastMessage?.createdAt ?? data.createdAt)}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xs text-bg2 font-bold text-left line-clamp-2">{message}</p>
        </div>
      </div>
    </div>
  );
}
