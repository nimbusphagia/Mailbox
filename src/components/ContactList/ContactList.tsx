import type { Contact } from "@/lib/schemas/contact.schema"
import { UserThumbnail } from "../UserThumbnail/UserThumbnail"

type Props = {
  contacts: Contact[],
}
export function ContactList({ contacts }: Props) {
  return (
    <div className="flex flex-col gap-2 px-2 min-h-40 ">
      {contacts.length ?
        <>
          {contacts.map((c) =>
            <UserThumbnail
              key={c.id}
              imgUrl={c.user!.imgUrl!}
              fullName={c.user!.name}
            />
          )}
        </> :
        <p className="text-center text-sm text-bg2/70 w-[80%] m-auto">
          You can find and add contacts in the <span className="font-bold">"Explore"</span> section.</p>
      }
    </div>
  )
}
