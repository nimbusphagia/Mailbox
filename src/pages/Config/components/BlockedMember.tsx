import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LockKeyholeOpen } from "lucide-react"

type Props = {
  name: string,
  username: string,
  imgUrl: string,
  unblockFn: () => void,
}
export function BlockedMember({ name, username, imgUrl, unblockFn }: Props) {
  return (
    <div className="h-[13%] relative border-[1px] border-fg4 rounded-lg p-2 pl-3 pr-5 flex items-center gap-3 w-fit">
      <Avatar className="h-full w-auto bg-fg3 border-[1px] border-fg2">
        <AvatarImage src={imgUrl} />
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-bg1 font-semibold">{name}</p>
        <p className="text-xs">@{username}</p>
      </div>
      <Button
        className="absolute -right-3 -top-2 bg-fg2 border-[1px] border-fg4 size-fit p-[6px] rounded-full"
        onClick={unblockFn}
        title="Unblock"
      >
        <LockKeyholeOpen className="text-bg3 size-[0.75em]" />
      </Button>
    </div>
  )
}
