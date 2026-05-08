import { UserThumbnail } from "../UserThumbnail/UserThumbnail"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { Button } from "../ui/button"

type Props = {
  users: SafeUser[],
}
export function UsersList({ users }: Props) {
  return (
    <div className="flex flex-col *:flex1 max-h-65 p-1 h-fit rounded-xs bg-fg4 overflow-y-scroll">
      {users.length ?
        <>
          {users.map((u) =>
            <div className="flex justify-between px-3 py-2 bg-fg4/70">
              <UserThumbnail
                key={u.id}
                imgUrl={u.imgUrl!}
                fullName={"@" + u.username}
              />

              <Button className="text-bg2 ">
                Add
              </Button>
            </div>
          )}

        </> :
        <p className="text-center text-sm text-bg2/70 w-[80%] m-auto">
          You are the first and only user on MailBox. :( </p>
      }
    </div>
  )
}
