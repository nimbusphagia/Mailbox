import api from "@/lib/api";
import type { ChatLazy } from "@/lib/schemas/chat.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";

export type HomeLoaderReturn = {
  user: SafeUser;
  chats: ChatLazy[];
};

export async function HomeLoader(): Promise<HomeLoaderReturn> {
  const [{ data: user }, { data: chats }] = await Promise.all([
    api.get<SafeUser>("api/user/me"),
    api.get<ChatLazy[]>("api/chat"),
  ]);
  return { user, chats };
}
