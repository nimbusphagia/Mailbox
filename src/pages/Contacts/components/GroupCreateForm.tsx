import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { PillAvatar } from "@/components/PillAvatar";
import { useProfilePictureEditor } from "@/hooks/useProfilePictureEditor";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";
import { PicturePicker } from "@/components/PicturePicker";
import type { ProfilePicture } from "@/lib/schemas/assets.schema";
import { ProfilePictureComponent } from "@/components/ProfilePicture";

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
  const picture = useProfilePictureEditor(profilePictures, undefined, true);

  const submitCreate = () => {
    if (groupName === undefined || !selected.length) return;
    const group: GroupReq = { name: groupName, members: selected };

    if (picture.image) {
      onCreate(group, picture.image);
    } else if (picture.selectedAsset) {
      onCreate(group, undefined, picture.selectedAsset);
    } else {
      onCreate(group);
    }
  };

  return (
    <div className={`text-center font-bold flex flex-col p-2 gap-2 flex-1
      *:rounded-sm *:border-[1px]
      `}>
      <header className=" border-fg4 text-sm font-light p-1.5 text-bg4">
        <h2>Create Group</h2>
      </header>
      <main className="border-fg4 p-2 [&_*]:border-fg4 flex flex-col gap-2 h-full">
        <ProfilePictureComponent
          imgUrl={picture.imgUrl}
          fileInputRef={picture.inputRef}
          handlePicker={picture.togglePicker}
          handlePreview={picture.onFileSelected}
          handleDelete={picture.onDelete}
        />
        {picture.showPicker &&
          <PicturePicker
            pictures={profilePictures}
            onPictureClick={picture.onAssetPicked}
            onCameraClick={picture.openFilePicker}
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
        <div className="flex-1 flex flex-wrap content-start justify-between items-start gap-4 rounded-sm py-3 pl-3.5 pr-4.5 
        border-[1px] overflow-y-scroll overflow-x-hidden scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {members.map(c =>
            c.user &&
            <PillAvatar
              key={c.id}
              name={c.nickname ?? c.user.name}
              imgUrl={c.user.imgUrl!}
              className="h-fit px-2! gap-2!"
              avatarClassname="size-[1.5em]"
            >
              <Button
                className="absolute size-fit -right-3.5 -top-1.5 bg-fg2 border-bg3 rounded-full
          p-[4.5px] flex hover:bg-fg0 hover:text-bg1!"
                onClick={() => onUnselectMember(c.user!.id)}
              >
                <Trash2 className="size-[0.65em]" color="var(--color-bg3)" />
              </Button>
            </PillAvatar>
          )}
        </div>
        <div className="h-fit flex justify-between mt-auto *:text-xs">
          <Button onClick={onReturn} className="text-bg3">Return</Button>
          <Button onClick={submitCreate} className="text-bg4 border-bg4!">Create</Button>
        </div>
      </main >
    </div >
  )
}
