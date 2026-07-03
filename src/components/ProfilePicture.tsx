import { Image, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import type { ChangeEventHandler, Ref } from "react";

type Props = {
  imgUrl: string,
  fileInputRef: Ref<HTMLInputElement>,
  handlePicker: () => void,
  handleDelete: () => void,
  handlePreview: ChangeEventHandler<HTMLInputElement>,
  actionsClassName?: string,
}
export function ProfilePictureComponent({ imgUrl, fileInputRef, handlePicker, handleDelete, handlePreview, actionsClassName }: Props) {
  return (
    <div className="relative h-fit">
      <div
        className={`border-[1px] border-bg3! 
       min-h-[100px] h-[5em] mx-auto aspect-square rounded-full m-2 overflow-hidden
        bg-fg1/65 flex justify-center`}>
        <img
          src={imgUrl}
          alt="Preview"
          className="w-full h-full object-cover object-center"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePreview}
        />
      </div>
      <div className={`absolute right-0 top-20 flex gap-1 ${actionsClassName}`}>
        <Button
          className="m-auto aspect-square p-2 rounded-full 
            size-fit bg-fg1! border-bg4! opacity-[0.5] hover:opacity-[1]
            "
          onClick={handlePicker}
        >
          <Image
            className=" h-[1em] aspect-square text-bg4"
          />
        </Button>
        <Button
          className="m-auto aspect-square p-2 rounded-full 
            size-fit bg-fg1! border-bg3 opacity-[0.5] hover:opacity-[1]
            "
          onClick={handleDelete}
        >
          <Trash2
            className=" h-[1em] aspect-square text-bg3"
          />
        </Button>
      </div>
    </div>
  )
}
