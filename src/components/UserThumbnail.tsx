import { Avatar, AvatarImage } from "./ui/avatar"

type Props = {
  imgUrl: string,
  fullName: string,
  className?: string
  showFn: () => void
}
export function UserThumbnail({ imgUrl, fullName, className, showFn }: Props) {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={showFn}
    >
      <Avatar>
        <AvatarImage src={imgUrl} />
      </Avatar>
      <div>
        <p className={`text-bg1 font-bold text-md ${className}`}>{fullName}</p>
      </div>
    </div >
  )
}
