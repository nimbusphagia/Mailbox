import { Avatar, AvatarImage } from "./ui/avatar"

type Props = {
  imgUrl: string,
  fullName: string,
  className?: string
  showFn?: () => void
}
export function UserThumbnail({ imgUrl, fullName, className, showFn }: Props) {
  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={showFn}
    >
      <Avatar>
        <AvatarImage
          src={imgUrl}
          className="bg-fg1/50 border-fg0/10 shadow-lg"
        />
      </Avatar>
      <div>
        <p className={`text-bg1/90 font-bold text-sm ${className}`}>{fullName}</p>
      </div>
    </div >
  )
}
