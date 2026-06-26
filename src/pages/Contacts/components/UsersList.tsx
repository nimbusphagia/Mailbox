import { UserThumbnail } from "@/components/UserThumbnail"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { Button } from "@/components/ui/button"
import type { UuidType } from "@/lib/schemas/util.schema"
import { ContactListLayout } from "@/layouts/ContactListLayout"

type Props = {
  users: SafeUser[],
  addFn: (userId: UuidType) => void,
}
export function UsersList({ users, addFn }: Props) {
  return (
    <ContactListLayout
      isEmpty={!!users.length}
      fbText="This is empty."
    >
      {
        <>
          {users.map((u) =>
            <div
              className="flex justify-between px-3 py-2 border-b-2 border-bg4"
              key={u.id}
            >
              <UserThumbnail
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
    </ContactListLayout>
  )
}
