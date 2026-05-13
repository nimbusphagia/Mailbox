import type { Message } from "@/lib/schemas/message.schema"
import type { SafeUser } from "@/lib/schemas/user.schema"

type Props = {
  message: Message,
  primary: SafeUser,
  secondary: SafeUser,
}

export function MessageComponent({ message, primary, secondary }: Props) {
  const isPrimary = message.senderId === primary.id;
  return (
    <div>
      {isPrimary ?
        <span>
          {primary.name + " >"}
        </span>

        :
        <span>
          {secondary.name + " >"}
        </span>

      }
      <p>{message.content}</p>
    </div>
  )
}

