import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
type Props = {
  pictures: ProfilePicture[],
  cols?: number,
  onCameraClick: () => void,
  onPictureClick: (img: ProfilePicture) => void,
}

export function PicturePicker({ pictures, onCameraClick, onPictureClick, cols = 5 }: Props) {

  const buttonStyle = "h-full p-1.5! aspect-square rounded-full border-bg3! bg-fg4/50 hover:bg-fg4/80"
  const gridCols = `grid-cols-${cols}`

  return (
    <div className={`w-full grid ${gridCols} gap-x-3 gap-y-1 p-2.5 border-[1px] border-fg4 rounded-sm`}>
      <Button
        className={buttonStyle}
        onClick={onCameraClick}
      >
        <Camera
          className="size-full text-bg4"
          strokeWidth={1}
        />
      </Button>

      {pictures.map((picture) => (
        <Button
          key={picture.name}
          className={buttonStyle}
          onClick={() => onPictureClick(picture)}
        >
          <img
            src={picture.url}
            alt={picture.name}
            className=""
          />
        </Button>
      ))}
    </div>
  )
}
