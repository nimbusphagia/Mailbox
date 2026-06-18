import { formatDate } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DoorOpen, Image, Package, Trash, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import { PillAvatar } from "@/components/PillAvatar";
import { MemberPill } from "./components/MemberPill";
import { ChatInfoLayout } from "@/layouts/ChatInfoLayout";
import { UserThumbnail } from "@/components/UserThumbnail";
import { AsciiRandom } from "@/components/AsciiRandom";

type Props = {
  group: GroupRes,
  images: string[],
  hideFn: () => void,
  titleFn: (id: UuidType, title: string) => void,
}
export function GroupPage({ group, images, hideFn, titleFn }: Props) {
  const [title, setTitle] = useState<string>(group.name);
  const activeRole = group.primaryMember.role;
  const [showMedia, setShowMedia] = useState<boolean>(false);

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
      <div className="flex flex-col gap-5 items-center p-3 ">
        <Avatar className="size-fit">
          <AvatarImage
            src={group.imgUrl}
            className="h-23 bg-fg0/10 border-1 border-fg3 shadow-sm"
          />
        </Avatar>
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
      <div className="flex flex-col gap-4 px-3 py-3 [&_*]:text-bg2 [&_*]:text-sm">
        <div className="flex justify-between">
          <label className="font-medium flex items-center gap-1" htmlFor="name">
            <User className="size-[1rem]" />
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
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="font-medium flex items-center gap-2">
              <Image className="size-[1rem]" />
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
              {images.map(url =>
                <div
                  key={url}
                  className="size-full border-1 border-fg3 rounded-xs overflow-hidden">
                  <img
                    src={url}
                    className="object-center size-full"
                  />
                </div>
              )}
            </div>
          }
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium flex items-center gap-1">
            <Users className="size-[1rem]" />
            {`Members (${group.secondaryMembers.length + 1})`}
          </label>
          <div className="flex flex-wrap flex-1 justify-evenly gap-x-4 gap-y-3.5 p-2! bg-fg1 border-1 border-fg2 rounded-sm">
            <PillAvatar
              name={group.primaryMember.name}
              imgUrl={group.primaryMember.imgUrl!}
              className="px-2.5! "
              avatarClassname="size-[1.3em]"
              titleClassname="text-fg2 font-black! underline decoration-[0.15em]"
            />
            {group.secondaryMembers.map((m) => (
              <MemberPill key={m.id} member={m} activeRole={activeRole} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex p-3 mt-auto justify-between text-sm *:bg-transparent *:text-bg2 *:px-3 *:hover:bg-fg2/70 *:rounded-sm!">
        <Button className="font-medium hover:text-orange/90! px-4!">
          <Package />
          Archive
        </Button>
        <Button
          className="font-medium hover:text-red! px-4!"
          onClick={() => null}
        >
          {
            group.primaryMember.id === group.createdBy?.id ?
              <>
                <Trash />
                Delete Group
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
