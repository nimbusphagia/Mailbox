import type { SafeUser } from "@/lib/schemas/user.schema"
import { Button } from "@/components/ui/button"
import type { UuidType } from "@/lib/schemas/util.schema"
import { ContactListLayout } from "@/layouts/ContactListLayout"
import { PillAvatar } from "@/components/PillAvatar"
import { UserRoundPlus } from "lucide-react"

type Props = {
  users: SafeUser[],
  addFn: (userId: UuidType) => void,
}

export function UsersList({ users, addFn }: Props) {
  const colorClasses = "text-bg2! border-fg4!";

  return (
    <ContactListLayout
      isEmpty={!!users.length}
      fbText="No more users to show."
    >
      {
        <>
          {users.map((u) => {
            return (
              <div
                className={`group flex justify-between items-center ${colorClasses}`}
                key={u.id}
                aria-label={`Add ${u.username} as contact`}
                title={`Add ${u.username} as contact`}
              >
                <PillAvatar
                  imgUrl={u.imgUrl!}
                  name={"@" + u.username}
                  className={`justify-between w-full px-3! ${colorClasses}`}
                  titleClassname={colorClasses}
                  avatarClassname="size-[2.3em]"
                >
                  <Button
                    type="button"
                    onClick={() => addFn(u.id)}
                    className={`flex items-center justify-center rounded-full bg-fg1/30 border-fg4 text-bg3 p-1.5 size-fit!
                      hover:text-bg2!
                      `}
                  >
                    <UserRoundPlus className="size-[0.8em]" />
                  </Button>
                </PillAvatar>
              </div>)
          }
          )}
        </>
      }
    </ContactListLayout>
  )
}
