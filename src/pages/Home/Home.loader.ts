import api from "@/lib/api";
import type { ChatLazy } from "@/lib/schemas/chat.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import axios from "axios";
import z from "zod";
import { ChatLazySchema } from "@/lib/schemas/chat.schema";
import { redirect } from "react-router-dom";
import { GroupLazySchema, type GroupLazy } from "@/lib/schemas/group.schema";
export type ArchivedChats = {
  chats: ChatLazy[];
  groups: GroupLazy[];
};
export type HomeLoaderReturn = {
  user: SafeUser;
  chats: ChatLazy[];
  groups: GroupLazy[];
  archived: ArchivedChats;
};

export async function HomeLoader(): Promise<HomeLoaderReturn> {
  try {
    const [
      { data: user },
      { data: chats },
      { data: groupChats },
      { data: archivedChats },
      { data: archivedGroups },
    ] = await Promise.all([
      api.get<SafeUser>("api/user/me"),
      api.get<ChatLazy[]>("api/chat"),
      api.get<GroupLazy[]>("api/group"),
      api.get<ChatLazy[]>("api/chat?archived=true"),
      api.get<GroupLazy[]>("api/group?archived=true"),
    ]);

    const [parsedChats, parsedGroups, parsedArchChats, parsedArchGroups] = [
      z.array(ChatLazySchema).safeParse(chats),
      z.array(GroupLazySchema).safeParse(groupChats),
      z.array(ChatLazySchema).safeParse(archivedChats),
      z.array(GroupLazySchema).safeParse(archivedGroups),
    ];
    if (
      !parsedChats.success ||
      !parsedGroups.success ||
      !parsedArchChats.success ||
      !parsedArchGroups.success
    ) {
      throw new Response("Invalid data", { status: 500 });
    }

    return {
      user,
      chats: parsedChats.data,
      groups: parsedGroups.data,
      archived: { chats: parsedArchChats.data, groups: parsedArchGroups.data },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) throw redirect("/login");
      throw new Response(
        err.response?.data?.message ?? "Something went wrong",
        {
          status: err.response?.status ?? 500,
          statusText: err.response?.statusText ?? "Server Error",
        },
      );
    }
    throw new Response("Unexpected error", { status: 500 });
  }
}
