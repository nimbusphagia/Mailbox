import { AsciiRandom } from "@/components/AsciiRandom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

type Props = {
  title: string,
  imgUrl: string,
  createdAt: Date
}
export function ChatInit({ title, imgUrl, createdAt }: Props) {
  return (
    <div className="flex flex-col gap-4 w-[60%] p-3 m-auto my-2">
      <div
        className="flex flex-col gap-4 items-center p-4 bg-fg2/50
      border-[1px] border-fg3 rounded-sm shadow-sm">
        <Avatar className="size-fit">
          <AvatarImage
            src={imgUrl}
            className="size-25 bg-fg1/50 border-[1px] border-fg4 "
          />
        </Avatar>
        <AsciiRandom
          text={title}
          className="text-bg4!"
          containerCN=" min-w-[250px] max-w-[500px] max-h-[60px]"
        />
        <div className="text-center font-bold flex flex-col gap-1">
          <p className="font-normal text-xs text-bg4/60">{"Created on " + formatDate(new Date(createdAt), "long")}</p>
        </div>
      </div>
    </div>
  )
}
