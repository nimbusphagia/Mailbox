import { formatDate } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DoorOpen, Image, Package, Trash, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import { MemberPill } from "./components/MemberPill";
import { ChatInfoLayout } from "@/layouts/ChatInfoLayout";
import { UserThumbnail } from "@/components/UserThumbnail";
import { AsciiRandom } from "@/components/AsciiRandom";
import { ProfilePictureComponent } from "@/components/ProfilePicture";
import { useProfilePictureEditor } from "@/hooks/useProfilePictureEditor";
import type { ProfilePicture } from "@/lib/schemas/assets.schema";
import { PicturePicker } from "@/components/PicturePicker";

type Props = {
  group: GroupRes,
  images: string[],
  profilePictures: ProfilePicture[],
  archiveFn: () => void,
  removeMemberFn: (userId: UuidType, chatId: UuidType) => void,
  hideFn: () => void,
  titleFn: (id: UuidType, title: string) => void,
}
export function GroupPage({ group, profilePictures, images, archiveFn, hideFn, removeMemberFn, titleFn }: Props) {
  const [title, setTitle] = useState<string>(group.name);
  const activeRole = group.primaryMember.role;
  const [showMedia, setShowMedia] = useState<boolean>(false);
  const picture = useProfilePictureEditor(profilePictures, group.imgUrl);

  function GroupLabel() {
    return (
      <UserThumbnail
        imgUrl={group.imgUrl ?? ""}
        fullName={title}
        className="gap-2!"
        textClassName="text-bg2! text-sm"
        avatarClassname="size-[1.8em] "
      />
    )
  }

  return (
    <ChatInfoLayout
      label={GroupLabel()}
      backFn={hideFn}
    >
      <div className=" w-full flex flex-col gap-1 items-center p-1 ">
        {group.primaryMember.role === "OWNER" ?
          <div className="w-[60%] flex flex-col gap-2 ">
            <ProfilePictureComponent
              imgUrl={picture.imgUrl}
              fileInputRef={picture.inputRef}
              handlePicker={picture.togglePicker}
              handlePreview={picture.onFileSelected}
              handleDelete={picture.onDelete}
              actionsClassName="gap-3"
            />
            {picture.showPicker &&
              <>
                <PicturePicker
                  pictures={profilePictures}
                  onPictureClick={picture.onAssetPicked}
                  onCameraClick={picture.openFilePicker}
                  cols="grid-cols-6"
                />
                <div className="flex justify-between mt-auto *:text-xs *:rounded-sm py-1">
                  <Button
                    className="text-bg3">Cancel</Button>
                  <Button
                    className="text-bg4 border-bg4!">Confirm</Button>
                </div>
              </>
            }
          </div>
          : <Avatar className="size-fit">
            <AvatarImage
              src={group.imgUrl}
              className="h-23 bg-fg0/10 border-1 border-fg3 shadow-sm"
            />
          </Avatar>
        }
        <div className="h-25 font-bold flex flex-col gap-2 py-2 items-center">
          <AsciiRandom
            text={title}
            className="text-bg0!"
          />
          <p
            className="font-medium self-center text-xs text-bg2/75 "
          >{"Created on " + formatDate(new Date(group.createdAt), "long")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-3 py-3 [&_*]:text-bg3 [&_*]:text-sm">
        <div className="flex justify-between">
          <label className="font-medium flex items-center gap-1" htmlFor="name">
            <User className="size-[1em]" />
            Group Name
          </label>
          {
            activeRole === "MEMBER" ?
              <p className="text-center min-w-[25%] w-fit">{title}</p> :
              <input
                name="name"
                id="name"
                placeholder="Insert a group name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => titleFn(group.id, title)}
                className="bg-fg2/30 text-center min-w-[25%] flex-0 rounded-sm p-0.5"
              />
          }
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label className="font-medium flex items-center gap-2">
              <Image className="size-[1em]" />
              Files
            </label>
            <Button
              className="flex items-center gap-1 p-2! text-sm! w-[25%] rounded-sm"
              onClick={() => setShowMedia(!showMedia)}
            >
              {showMedia ? "Hide" : "Show"}
            </Button>
          </div>

          {
            showMedia &&
            <div className="grid grid-cols-4 w-full gap-2.5 p-2! bg-fg1 border-1 border-fg2 rounded-sm">
              {images.length ? images.map(url =>
                <div
                  key={url}
                  className="size-full border-1 border-fg3 rounded-xs overflow-hidden">
                  <img
                    src={url}
                    className="object-center size-full"
                  />
                </div>
              ) :
                <div className="h-[35px] flex items-center justify-center  col-span-full ">
                  <p className="text-xs!">No shared media to display</p>
                </div>
              }
            </div>
          }
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium flex items-center gap-1">
            <Users className="size-[1em]" />
            {`Members(${group.secondaryMembers.length + 1})`}
          </label>
          <div className="flex flex-wrap flex-1 justify-around gap-y-4 gap-x-3
          py-3! px-3.5! bg-fg2/50 border-1 border-fg4 rounded-sm">
            <MemberPill
              member={group.primaryMember}
              primary={true}
            />
            {group.secondaryMembers.map((m) => (
              <MemberPill
                key={m.id}
                member={m}
                removeFn={group.primaryMember.role === "OWNER" ? () => removeMemberFn(m.id, group.id) : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex p-3 mt-auto justify-between text-xs *:bg-transparent *:text-bg2 *:px-3 *:hover:bg-fg2/70 *:rounded-sm!">
        <Button
          className="font-medium hover:text-orange/90! px-4!"
          onClick={archiveFn}>
          <Package />
          {group.isArchived ? "Unarchive" : "Archive"}
        </Button>
        <Button
          className="font-medium hover:text-red! px-4!"
          onClick={() => null}
        >
          {
            group.primaryMember.id === group.createdBy?.id ?
              <>
                <Trash />
                Delete
              </> :
              <>
                <DoorOpen />
                Leave
              </>
          }
        </Button>
      </div>

    </ChatInfoLayout >
  )

}
