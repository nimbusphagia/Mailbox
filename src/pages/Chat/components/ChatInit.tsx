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
    <div className="flex flex-col gap-4 w-fit max-w-[80%] p-5 m-auto my-4">
      <div
        className="flex flex-col gap-4 items-center p-5 bg-fg1 
      border-[1px] border-fg0 rounded-sm shadow-sm">
        <Avatar className="size-fit">
          <AvatarImage
            src={imgUrl}
            className="size-25 bg-fg1/50 border-fg0/10  shadow-lg"
          />
        </Avatar>
        <AsciiRandom
          text={title}
          className="text-bg2!"
          containerCN=" min-w-[250px] max-w-[500px] max-h-[50px]"
        />
      </div>
      <div className="text-center font-bold flex flex-col gap-1">
        <p className="font-semibold text-xs text-bg3">{"Created on " + formatDate(new Date(createdAt), "long")}</p>
      </div>
    </div>
  )
}
