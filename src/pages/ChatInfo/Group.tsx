import { useFiglet } from "../Hooks/useFiglet";
import { formatDate, trimSentence } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, DoorOpen, Image, Package, Trash, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UuidType } from "@/lib/schemas/util.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import { PillAvatar } from "@/components/PillAvatar";
import { MemberPill } from "./components/MemberPill";

type Props = {
  group: GroupRes,
  images: string[],
  hideFn: () => void,
  titleFn: (id: UuidType, title: string) => void,
}
export function GroupPage({ group, images, hideFn, titleFn }: Props) {
  const { ascii, loading } = useFiglet(trimSentence(group.name, 2), { font: "BlurVision ASCII" });
  const [title, setTitle] = useState<string>(group.name);
  const activeRole = group.primaryMember.role;
  const [showMedia, setShowMedia] = useState<boolean>(false);

  return (
    <div className="relative size-full flex flex-col gap-3 items-center p-8 py-4 bg-fg2/80 overflow-y-scroll">
      <Button
        className="cursor-pointer text-bg1 absolute inset-3 inset-y-4 size-[1.2em] p-2"
        onClick={hideFn}
      >
        <ChevronDown
        />
      </Button>
      <div className="w-[68%] *:w-full *:border-b-2 *:border-fg4">
        <div className="h-fit flex flex-col gap-5 items-center p-6 pb-3 ">
          <Avatar className="size-fit">
            <AvatarImage
              src={group.imgUrl}
              className="size-35 bg-fg0/10 border-1 border-fg3 shadow-sm"
            />
          </Avatar>
          <div className="text-center font-bold flex flex-col">
            <pre className="select-none text-[0.3em] text-bg0 font-black leading-none">
              {loading ? title : ascii}
            </pre>
            <p className="font-semibold text-xs text-bg2/85">{"Created on " + formatDate(new Date(group.createdAt), "long")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-3 py-5 *:gap-5">
          <div className="flex justify-between text-sm *:text-bg2  *:p-1">
            <label
              className="font-bold flex items-center gap-1"
              htmlFor="name"
            >
              <User className="size-[1rem]" />
              Group Name
            </label>
            {
              activeRole === "MEMBER" ?
                <p>{title}</p> :
                <input
                  name="name"
                  id="name"
                  placeholder="Insert a group name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => titleFn(group.id, title)}
                  className="bg-fg2/30 text-center min-w-[30%] flex-0 rounded-xs"
                />
            }
          </div>
          <div className="flex flex-col items-start gap-1! text-sm *:text-bg2 *:p-1">
            <Button
              className="font-bold flex items-center gap-1 text-bg1! capitalize"
              onClick={() => setShowMedia(!showMedia)}
            >
              <Image className="size-[1rem]" />
              Files
            </Button>
            {
              showMedia &&
              <div className="grid grid-cols-3 w-full gap-2 p-3! bg-bg3/22 rounded-sm">
                {images.map(url =>
                  <div
                    key={url}
                    className="size-full rounded-xs overflow-hidden">
                    <img
                      src={url}
                      className="object-center size-full"
                    />
                  </div>
                )}
              </div>
            }
          </div>
        </div>
        <div className="flex  flex-col text-sm *:text-bg2 p-6 gap-5">
          <label
            className="font-bold flex items-center gap-1"
            htmlFor="name"
          >
            <Users className="size-[1rem]" />
            {`Members (${group.secondaryMembers.length + 1})`}
          </label>
          <div className="flex flex-wrap flex-1 justify-evenly gap-x-4 gap-y-3.5 rounded-sm">
            <PillAvatar
              name={group.primaryMember.name}
              imgUrl={group.primaryMember.imgUrl!}
              className="px-3! bg-bg3/70! shadow-transparent!"
              avatarClassname="size-[1.3em]"
              titleClassname="text-fg2 font-black! underline decoration-[0.15em]"
            />
            {group.secondaryMembers.map((m) => (
              <MemberPill key={m.id} member={m} activeRole={activeRole} />
            ))}
          </div>
        </div>
        <div className="flex p-3 justify-between text-sm *:p-1 *:text-bg2 *:px-3 *:hover:bg-fg2/70">
          <Button className="font-bold hover:text-orange/93">
            <Package />
            Archive
          </Button>
          <Button
            className="font-bold hover:text-red"
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

      </div >
    </div >
  )

}

