import { PillAvatar } from "./PillAvatar";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type Props = {
  name: string,
  imgUrl: string,
  onClick?: () => void,
  className?: string,
  avatarClassname?: string,
}
export function PillX({ name, imgUrl, onClick, className, avatarClassname }: Props) {
  return (
    <PillAvatar
      name={name}
      imgUrl={imgUrl}
      className={className}
      avatarClassname={avatarClassname}
    >
      <Button
        className="absolute top-1.5 left-1.5 size-fit p-0 hover:bg-transparent hover:*:text-bg0"
        onClick={onClick}
      >
        <X className="text-bg2 size-[0.6rem]" />
      </Button>
    </PillAvatar>

  )
}
