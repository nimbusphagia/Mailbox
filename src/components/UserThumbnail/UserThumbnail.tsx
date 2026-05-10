import { Avatar, AvatarImage } from "../ui/avatar"

type Props = {
  imgUrl: string,
  fullName: string,
  className?: string
}
export function UserThumbnail({ imgUrl, fullName, className }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={imgUrl} />
      </Avatar>
      <div>
        <p className={`text-bg1/90 font-bold text-sm ${className}`}>{fullName}</p>
      </div>
    </div >
  )
}
