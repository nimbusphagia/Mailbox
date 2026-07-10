import type { ContactType } from "@/lib/schemas/contact.schema"
import { Ban } from "lucide-react"
import { BlockedMember } from "./BlockedMember"
import type { UuidType } from "@/lib/schemas/util.schema"

type Props = {
  contacts: ContactType[],
  unblockFn: (contactId: UuidType) => void
}
export function BlockedContacts({ contacts, unblockFn }: Props) {
  return (
    <div
      className="overflow-hidden m-4 ml-2 rounded-sm flex flex-col 
      gap-4 *:rounded-sm
      ">
      <header
        className="flex items-center gap-2 *:bg-fg2 
      *:rounded-sm *:p-2 *:border-[0.01em] *:border-fg3 *:text-bg1
        ">
        <div className="flex gap-2 items-center">
          <Ban className="size-[1em]" />
          <h2
            className="text-sm font-semibold "
          >
            {`Blocked Contacts (${contacts.length})`}
          </h2>
        </div>
      </header>
      <main
        className="relative border-1 border-fg4 h-full p-3
        bg-fg2/30 flex flex-col items-center gap-12 overflow-y-scroll 
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        <div className=" w-[100%] *:w-[90%] h-full flex flex-col justify-center items-center gap-4">
          <div className="h-[80%] flex gap-6 border-[1px] border-fg3 bg-fg2 p-4 rounded-sm overflow-y-scroll
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {contacts.length ? contacts.map((c) => {
              if (!c.user) return null;
              return (
                <BlockedMember
                  name={c.user.name}
                  username={c.user.username}
                  imgUrl={c.user.imgUrl}
                  unblockFn={() => unblockFn(c.id)}
                />
              )
            }
            ) :
              <p className="text-sm text-bg2 size-fit m-auto self-center">No blocked contacts</p>
            }
          </div>
          <p className="text-xs text-center text-bg3">Unblocking a contact enables the ability to message each other again.</p>
        </div>
      </main>
    </div>
  )
}

