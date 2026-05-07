import { Avatar } from "./avatar"
import { AvatarImage } from "./avatar"

type ThumbnailProps = {
  imgUrl: string,
  name: string,
  lastMessage: string,
}
export function ChatThumbnail({ imgUrl, name, lastMessage = "" }: ThumbnailProps) {
  return (
    <div>
      <Avatar>
        <AvatarImage
          src={imgUrl}
        />
      </Avatar>
      <div>
        <h4>{name}</h4>
        <p>{lastMessage}</p>
      </div>
    </div>
  )

}
