import { PillAvatar } from "@/components/PillAvatar"
import { Button } from "@/components/ui/button";
import type { GroupMember } from "@/lib/schemas/group.schema"
import { ShieldCheck, Trash2 } from "lucide-react";

type Props = {
  member: GroupMember,
  primary?: boolean,
  removeFn?: (() => void),
}
export function MemberPill({ member, removeFn, primary = false }: Props) {
  const name = primary ? `${member.name}(me)` : member.name;
  const primaryMemberStyle = "[&_*]:font-medium! bg-fg1/50! border-bg3! [&_*]:text-bg2!";

  return (
    <PillAvatar
      name={member.nickname ?? name}
      imgUrl={member.imgUrl!}
      className={`relative capitalize py-1.5! border-[1px] px-2.5! bg-fg1/30! shadow-transparent! rounded-sm!
        ${(primary || member.role === "OWNER") ? primaryMemberStyle : null}
        `}
      avatarClassname=" size-[1.4em]"
      titleClassname={`text-[0.8em]! font-normal! 
        `}
    >
      {member.role === "OWNER" &&
        <div className="absolute size-fit -right-3 -top-2 bg-fg1 border-[1px] border-bg2 rounded-full p-[3px] flex">
          <ShieldCheck className="size-[0.9em]" color="var(--color-bg2)" />
        </div>
      }
      {
        member.role !== "OWNER" && removeFn &&
        <Button
          onClick={removeFn}
          className="absolute size-fit -right-3 -top-2 bg-fg1 border-bg3 rounded-full p-[4.5px] flex hover:bg-fg0 hover:text-bg1!">
          <Trash2 className="size-[0.7em]" color="var(--color-bg3)" />
        </Button>
      }
    </PillAvatar>
  )
}

