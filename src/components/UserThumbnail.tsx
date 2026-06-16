import { Avatar, AvatarImage } from "./ui/avatar"

type Props = {
  imgUrl: string,
  fullName: string,
  className?: string,
  textClassName?: string
  showFn?: () => void,
  avatarClassname?: string,
}
export function UserThumbnail({ imgUrl, fullName, className, textClassName, avatarClassname, showFn }: Props) {
  return (
    <div
      className={`flex items-center gap-3.5 ${showFn ? "cursor-pointer" : ""} ${className}`}
      onClick={showFn}
    >
      <Avatar className={`size-[2em] border-[0.1em] border-fg2 ${avatarClassname}`}>
        <AvatarImage
          src={imgUrl}
          className="bg-fg1/50 border-fg0/10 shadow-lg"
        />
      </Avatar>
      <div>
        <p className={`text-bg1/90 font-bold text-sm ${textClassName}`}>{fullName}</p>
      </div>
    </div >
  )
}
