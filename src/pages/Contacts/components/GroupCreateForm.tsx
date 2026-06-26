import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";
import { PillAvatar } from "@/components/PillAvatar";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";

type Props = {
  members: ContactType[],
  onUnselectMember: (userId: UuidType) => void,
  onReturn: () => void,
  onCreate: (group: GroupReq, image?: ValidImage) => void,
  selected: UuidType[],
}

export function GroupCreateForm({ members, onUnselectMember, onReturn, onCreate, selected }: Props) {
  const [groupName, setGroupName] = useState<string>("");
  const { image: groupImage, setImage: setGroupImage, preview, inputRef: fileInputRef } = useImagePreview();

  const submitCreate = () => {
    if (groupName === undefined || !selected.length) { return };
    const group: GroupReq = {
      name: groupName,
      members: selected,
    };
    onCreate(group, groupImage ?? undefined);
  }

  return (
    <div className={`w-[30vw] text-center font-bold flex flex-col gap-4`}>
      <>
        {preview && (
          <div className="border-[0.1em] border-bg3 size-[55%] m-auto aspect-square rounded-full overflow-hidden">
            <div className="relative size-full rounded-full overflow-hidden">
              <Button
                className="absolute top-0 right-0 m-auto"
                onClick={() => setGroupImage(null)}
              >remove</Button>
              <img
                src={preview}
                alt="Preview"
                className="h-full"
              />
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setGroupImage(file);
          }}
        />

      </>
      <div className="flex gap-3 items-center *:bg-bg3 ">
        <Input
          className="text-[0.8em]! text-fg1 placeholder:text-fg1/70 focus:bg-bg2 border-2 border-fg1 rounded-sm"
          placeholder="Name your group"
          value={groupName}
          onChange={(e) => setGroupName(e.currentTarget.value)}
        />
        <Button
          className="h-full p-0.5 px-1 rounded-sm hover:bg-fg1 hover:*:text-bg2  
            border-2 border-fg1 "
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="size-fit text-fg1" />
        </Button>
      </div>
      <div className="flex flex-wrap flex-1 justify-evenly gap-x-4 gap-y-3.5 bg-bg3/85 rounded-sm p-3.5 border-2 border-fg1">
        {members.map(c =>
          c.user &&
          <PillAvatar
            key={c.id}
            name={c.nickname ?? c.user.name}
            imgUrl={c.user.imgUrl!}
            className="px-6"
            avatarClassname="size-[1.3em]"
          >
            <Button
              className="absolute top-1.5 left-1.5 size-fit p-0 hover:bg-transparent hover:*:text-bg0"
              onClick={() => onUnselectMember(c.user!.id)}
            >
              <X className="text-bg2 size-[0.6rem]" />
            </Button>
          </PillAvatar>
        )}
      </div>
      <div className="flex justify-between *:text-bg1">
        <Button
          onClick={onReturn}
        >Return</Button>

        <Button
          onClick={submitCreate}
        >Create</Button>

      </div>
    </div>
  )
}
