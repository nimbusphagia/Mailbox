import { UserThumbnail } from "../UserThumbnail/UserThumbnail"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { Button } from "../ui/button"
import type { UuidType } from "@/lib/schemas/util.schema"
import { ModalListLayout } from "@/layouts/ModalListLayout"

type Props = {
  users: SafeUser[],
  addFn: (userId: UuidType) => void,
}
export function UsersList({ users, addFn }: Props) {
  return (
    <ModalListLayout
      isEmpty={!!users.length}
      fbText="You are the first and only user on MailBox. :( "
    >
      {
        <>
          {users.map((u) =>
            <div className="flex justify-between px-3 py-2 bg-fg4/70">
              <UserThumbnail
                key={u.id}
                imgUrl={u.imgUrl!}
                fullName={"@" + u.username}
              />

              <Button
                type="button"
                className="text-bg2"
                onClick={() => addFn(u.id)}
              >
                Add
              </Button>
            </div>
          )}

        </>
      }
    </ModalListLayout>
  )
}
