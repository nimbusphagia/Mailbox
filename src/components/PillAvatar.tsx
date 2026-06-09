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
      className={`relative flex gap-2 items-center bg-fg4/90 p-2 px-4.5 rounded-md shadow-sm ${className}`}
    >
      <UserThumbnail
        imgUrl={imgUrl}
        fullName={name}
        className={`text-bg1 text-[0.8rem] ${titleClassname}`}
        avatarClassname={avatarClassname}
      />
      {children}
    </div>
  )
}
