import type { ChatLazy } from "@/lib/schemas/chat.schema";
import { ChatThumbnail } from "./ChatThumbnail";
import type { ChatEntry, UuidType } from "@/lib/schemas/util.schema";
import type { GroupLazy } from "@/lib/schemas/group.schema";
import { useMemo } from "react";
import { NotebookTabs } from "lucide-react";

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
      {
        sorted.length ?
          sorted.map((entry) => (
            <ChatThumbnail
              entry={entry}
              isGroup={entry.type === "group"}
              onClick={() => entry.type === "group" ? showGroup(entry.data.id) : showChat(entry.data.id)}
              key={entry.data.id} />
          ))

          :
          <div className="h-full flex flex-col pb-[50%] gap-2 items-center justify-center">
            <div className="size-[2.2em] rounded-full p-2 border-[1px] border-bg4">
              <NotebookTabs className="size-full text-bg4" />
            </div>
            <p className="text-center text-xs text-bg4 font-light w-[70%]">
              Find and add contacts in the Explore section.</p>
          </div>
      }
    </>
  );
}
