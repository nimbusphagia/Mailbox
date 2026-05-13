import api from "@/lib/api";
import type { ChatLazy } from "@/lib/schemas/chat.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import axios from "axios";
import z from "zod";
import { ChatLazySchema } from "@/lib/schemas/chat.schema";
import { redirect } from "react-router-dom";

export type HomeLoaderReturn = {
  user: SafeUser;
  chats: ChatLazy[];
};

export async function HomeLoader(): Promise<HomeLoaderReturn> {
  try {
    const [{ data: user }, { data: chats }] = await Promise.all([
      api.get<SafeUser>("api/user/me"),
      api.get<ChatLazy[]>("api/chat"),
    ]);

    const result = z.array(ChatLazySchema).safeParse(chats);
    if (!result.success) {
      throw new Response("Invalid data", { status: 500 });
    }
    return { user, chats: result.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        throw redirect("/login");
      }
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
