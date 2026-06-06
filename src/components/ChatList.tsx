import type { ChatLazy } from "@/lib/schemas/chat.schema";
import { ChatThumbnail } from "./ChatThumbnail";
import type { ChatEntry, UuidType } from "@/lib/schemas/util.schema";
import type { GroupLazy } from "@/lib/schemas/group.schema";
import { useMemo } from "react";

type Props = {
  chats: ChatLazy[],
  groups: GroupLazy[],
  showChat: (chatId: UuidType) => void,
  showGroup: (chatId: UuidType) => void,
}

export function ChatList({ chats, groups, showChat, showGroup }: Props) {
  const sorted = useMemo<ChatEntry[]>(() => {
    const entries: ChatEntry[] = [
      ...chats.map((c): ChatEntry => ({ type: "dm", data: c })),
      ...groups.map((g): ChatEntry => ({ type: "group", data: g })),
    ];
    return entries.sort((a, b) => {
      const aDate = a.data.lastMessage?.createdAt ?? a.data.createdAt;
      const bDate = b.data.lastMessage?.createdAt ?? b.data.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  }, [chats, groups]);

  return (
    <>
      {sorted.map((entry) => (
        <div
          key={entry.data.id}
          className="h-fit"
          onClick={() => entry.type === "group" ? showGroup(entry.data.id) : showChat(entry.data.id)}
        >
          <ChatThumbnail entry={entry} isGroup={entry.type === "group"} />
        </div>
      ))}
    </>
  );
}
