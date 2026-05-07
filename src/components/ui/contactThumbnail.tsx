import { Avatar, AvatarImage } from "./avatar"

type Props = {
  imgUrl: string,
  fullName: string
}
export function ContactThumbnail({ imgUrl, fullName }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={imgUrl} />
      </Avatar>
      <div>
        <p>{fullName}</p>
      </div>
    </div>
  )
}
