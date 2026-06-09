import { PillAvatar } from "@/components/PillAvatar"
import { PillX } from "@/components/PillX"
import type { GroupMember, GroupRole } from "@/lib/schemas/group.schema"
import { Badge, BadgeCheck } from "lucide-react"

export function MemberPill({ member, activeRole }: { member: GroupMember, activeRole: GroupRole }) {
  if (activeRole === "MEMBER") {
    return <PillAvatar name={member.nickname ?? member.name} imgUrl={member.imgUrl!} />
  }

  if (activeRole === "ADMIN" && member.role === "OWNER") {
    return (
      <PillAvatar
        name={member.nickname ?? member.name}
        imgUrl={member.imgUrl!}
        className="px-3! bg-bg3/70! shadow-transparent!"
        avatarClassname="size-[1.3em]"
        titleClassname="text-fg2 font-black! underline decoration-[0.15em]"
      />
    )
  }

  return (
    <div className="relative">
      <PillX
        name={member.nickname ?? member.name}
        imgUrl={member.imgUrl!}
        className={`px-6 ${member.role === "ADMIN" ? "bg-fg1!" : "bg-fg2/70!"} shadow-transparent!`}
        avatarClassname="size-[1.3em]"
      />
      {member.role === "ADMIN" ? (
        <BadgeCheck className="absolute size-[1.4em] top-[-0.4em] right-[-0.5em] text-bg0 cursor-pointer" fill="var(--color-fg2)" />
      ) : (
        <Badge className="absolute size-[1.4em] top-[-0.4em] right-[-0.4em] cursor-pointer" fill="var(--color-fg3)" />
      )}
    </div>
  )
}
