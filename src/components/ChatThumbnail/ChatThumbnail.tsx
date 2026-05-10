import type { Message } from "@/lib/schemas/message.schema"
import { Avatar } from "../ui/avatar"
import { AvatarImage } from "../ui/avatar"

type ThumbnailProps = {
  imgUrl: string,
  name: string,
  lastMessage: Message | undefined,
}
export function ChatThumbnail({ imgUrl, name, lastMessage }: ThumbnailProps) {
  const message = lastMessage
    ? lastMessage.type === 'TEXT'
      ? lastMessage.content ?? "This chat is empty."
      : "Media sent"
    : "Start a conversation!";
  return (
    <div>
      <Avatar>
        <AvatarImage
          src={imgUrl}
        />
      </Avatar>
      <div>
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
    </div>
  )

}
