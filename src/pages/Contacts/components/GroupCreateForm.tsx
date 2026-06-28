import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Trash2 } from "lucide-react";
import { PillAvatar } from "@/components/PillAvatar";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";
import { PicturePicker } from "@/components/PicturePicker";
import type { ProfilePicture } from "@/lib/schemas/assets.schema";

type Props = {
  members: ContactType[],
  profilePictures: ProfilePicture[],
  onUnselectMember: (userId: UuidType) => void,
  onReturn: () => void,
  onCreate: (group: GroupReq, image?: ValidImage, asset?: ProfilePicture) => void,
  selected: UuidType[],
}

export function GroupCreateForm({ members, profilePictures, onUnselectMember, onReturn, onCreate, selected }: Props) {
  const [groupName, setGroupName] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<ProfilePicture | null>(null);
  const { image: groupImage, setImage: setGroupImage, preview, setPreviewUrl, inputRef: fileInputRef } = useImagePreview();


  const submitCreate = () => {
    if (groupName === undefined || !selected.length) return;
    const group: GroupReq = { name: groupName, members: selected };

    if (groupImage) {
      onCreate(group, groupImage); // new upload
    } else if (selectedAsset) {
      onCreate(group, undefined, selectedAsset); // existing asset reference
    } else {
      onCreate(group);
    }
  };

  return (
    <div className={`text-center font-bold flex flex-col p-2 gap-2 h-full
      *:rounded-sm *:border-[1px]
      `}>
      <header className=" border-fg4 text-sm font-light p-1.5 text-bg4">
        <h2>Create Group</h2>
      </header>
      <main className="border-fg4 p-2 [&_*]:border-fg4 flex flex-col gap-2 h-full">
        <div className="relative h-fit">
          <div
            className={`border-[1px] border-bg3! 
       min-h-[100px] h-[5em] mx-auto aspect-square rounded-full m-2 overflow-hidden
        bg-fg1/65 flex justify-center`}>
            <img
              src={preview ?? "https://res.cloudinary.com/dlsa973vu/image/upload/v1782611648/gato_2_pye1ik.png"}
              alt="Preview"
              className="w-full h-full object-cover object-center"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setSelectedAsset(null);
                setGroupImage(file);
              }}
            />
          </div>
          <div className="absolute right-0 top-20 flex gap-1">
            <Button
              className="m-auto aspect-square p-2 rounded-full 
            size-fit bg-fg1! border-bg4! opacity-[0.5] hover:opacity-[1]
            "
              onClick={() => setShowPicker(!showPicker)}
            >
              <Image
                className=" h-[1em] aspect-square text-bg4"
              />
            </Button>
            <Button
              className="m-auto aspect-square p-2 rounded-full 
            size-fit bg-fg1! border-bg3 opacity-[0.5] hover:opacity-[1]
            "
              onClick={() => setGroupImage(null)}
            >
              <Trash2
                className=" h-[1em] aspect-square text-bg3"
                onClick={() => {
                  setGroupImage(null);
                  setSelectedAsset(null);
                  setPreviewUrl(null);
                }}
              />
            </Button>
          </div>
        </div>
        {showPicker &&
          <PicturePicker
            pictures={profilePictures}
            onPictureClick={(img: ProfilePicture) => {
              setSelectedAsset(img);
              setPreviewUrl(img.url);
            }}
            onCameraClick={() => fileInputRef.current?.click()}
          />
        }
        <div className="flex gap-3 items-center *:font-light">
          <input
            className="p-1 px-3 text-[0.8em] flex-1 outline-none text-bg1 border-1 border-transparent
                focus:placeholder:text-bg2 focus:text-bg1 focus:border-bg4 focus:bg-fg2/10 rounded-sm"
            placeholder="Name your group"
            value={groupName}
            onChange={(e) => setGroupName(e.currentTarget.value)}
          />

        </div>
        <div className="flex flex-wrap gap-2 rounded-sm p-2 border-[1px] min-h-[100px]  overflow-y-scroll">
          {members.map(c =>
            c.user &&
            <PillAvatar
              key={c.id}
              name={c.nickname ?? c.user.name}
              imgUrl={c.user.imgUrl!}
              className="px-2! gap-2! items-center"
              avatarClassname="size-[1.5em]"
            >
              <Button
                className="size-fit p-1 bg-transparent border-none"
                onClick={() => onUnselectMember(c.user!.id)}
              >
                <Trash2 className="text-bg2 size-[0.9rem]" />
              </Button>
            </PillAvatar>
          )}
        </div>
        <div className="flex justify-between mt-auto *:text-xs">
          <Button
            onClick={onReturn}
            className="text-bg3"
          >Return</Button>

          <Button
            onClick={submitCreate}
            className="text-bg4 border-bg4!"
          >Create</Button>

        </div>
      </main >
    </div >
  )
}
