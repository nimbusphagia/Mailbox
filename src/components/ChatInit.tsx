import { Avatar, AvatarImage } from "./ui/avatar"
import { formatDate, trimSentence } from "@/lib/utils"
import { useFiglet } from "@/pages/Hooks/useFiglet"

type Props = {
  title: string,
  imgUrl: string,
  createdAt: Date
}
export function ChatInit({ title, imgUrl, createdAt }: Props) {
  const { ascii, loading } = useFiglet(trimSentence(title, 2), { font: "BlurVision ASCII" })
  return (
    <div
      className="flex flex-col gap-5 items-center w-fit max-w-[100%] p-6 bg-fg1/55 rounded-sm m-auto my-6 shadow-md">
      <Avatar className="size-fit">
        <AvatarImage
          src={imgUrl}
          className="size-30 bg-fg1/50 border-fg0/10  shadow-lg"
        />
      </Avatar>
      <div className="text-center font-bold flex flex-col gap-1">
        <pre className="select-none text-[0.25em] text-bg0 font-black leading-none">
          {loading ? title : ascii}
        </pre>
        <p className="font-normal text-xs text-bg1/90">{"Created on " + formatDate(new Date(createdAt), "long")}</p>
      </div>
    </div>
  )
}
