import { Avatar, AvatarImage } from "../ui/avatar"

type Props = {
  imgUrl: string,
  fullName: string,
}
export function UserThumbnail({ imgUrl, fullName }: Props) {
  const color = "text-bg1/90";
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={imgUrl} />
      </Avatar>
      <div>
        <p className={`${color} font-bold text-sm`}>{fullName}</p>
      </div>
    </div >
  )
}
