import { type SafeUser } from "@/lib/schemas/user.schema"
import { Avatar, AvatarImage } from "./ui/avatar"

type Props = {
  contact: SafeUser
}
export function ChatInit({ contact }: Props) {
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
        <h3 className="text-[1.5em] text-bg0">{contact.name}</h3>
        <p className="text-sm text-bg2">{"@" + contact.username}</p>
      </div>
    </div>
  )
}
