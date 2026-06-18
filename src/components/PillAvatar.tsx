import type { PropsWithChildren } from "react"
import { UserThumbnail } from "./UserThumbnail"

type Props = {
  imgUrl: string,
  name: string,
  className?: string,
  avatarClassname?: string,
  titleClassname?: string,
}
export function PillAvatar({ imgUrl, name, className, avatarClassname, titleClassname, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`relative flex gap-2 items-center bg-transparent p-1.5 px-4.5 rounded-sm border-1 border-fg4 ${className}`}
    >
      <UserThumbnail
        imgUrl={imgUrl}
        fullName={name}
        className={`text-bg1 text-xs ${titleClassname}`}
        avatarClassname={avatarClassname}
      />
      {children}
    </div>
  )
}
