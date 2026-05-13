import type { Message } from "@/lib/schemas/message.schema"
import { MessageComponent } from "../Message/Message"
import type { SafeUser } from "@/lib/schemas/user.schema"

type Props = {
  messages: Message[],
  primary: SafeUser,
  secondary: SafeUser,
}
export function Messages({ messages, primary, secondary }: Props) {
  return (
    <div>
      {messages.map((m) => {
        return (
          <MessageComponent
            key={m.id}
            message={m}
            primary={primary}
            secondary={secondary}
          />
        )
      })}
    </div>
  )
}
