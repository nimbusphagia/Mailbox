import type { ChatType } from "@/lib/schemas/chat.schema"

type Props = {
  chat: ChatType,
}
export function Chat({ chat }: Props) {
  return (
    <main className="flex-1 w-full h-full">
      <p>{chat.id}</p>
    </main>
  )
}
