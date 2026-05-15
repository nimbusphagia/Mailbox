import { type ChatUser } from "@/lib/schemas/user.schema"
import { Avatar, AvatarImage } from "./ui/avatar"
import { formatDate } from "@/lib/utils"

type Props = {
  contact: ChatUser,
  createdAt: Date
}
export function ChatInit({ contact, createdAt }: Props) {

  return (
    <div
      className="flex flex-col gap-1 items-center w-full p-4">
      <Avatar className="size-fit">
        <AvatarImage
          src={contact.imgUrl}
          className="size-30"
        />
      </Avatar>
      <div className="text-center font-bold">
        <h3 className="text-[1.5em] text-bg0 leading-none">{contact.nickname ?? contact.name}</h3>
        <p className="text-sm text-bg1 pt-1">{"@" + contact.username}</p>
        <p className="text-sm text-bg2 pt-2">{"Created on " + formatDate(new Date(createdAt), "long")}</p>
      </div>
    </div>
  )
}
