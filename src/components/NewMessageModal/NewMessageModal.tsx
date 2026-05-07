import { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import type { Contact } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ContactList } from "../ContactList/ContactList";

type Props = {
  hideFn: () => void,
  contacts: Contact[],
  users: SafeUser[],
}
export function NewMessageModal({ hideFn, contacts, users }: Props) {
  const [filter, setFilter] = useState<boolean>(true);

  return (
    <Modal>
      <div className="z-10 flex-1 max-w-[35%] h-[clamp(40%,50%,600px) bg-fg4 p-2 flex flex-col gap-2 rounded-xs shadow-xs shadow-fg4">
        <div className="flex items-center justify-between ">
          <Button className="text-bg3 capitalize" onClick={hideFn}>Cancel</Button>
          <Button className="text-bg3 capitalize">New Message</Button>
        </div>
        <div className="w-[98%] m-auto">
          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full flex *:uppercase justify-around *:w-[35%] *:rounded-xs"
            defaultValue="contacts"
          >
            <ToggleGroupItem
              value="contacts"
              aria-label="filter by contacts"
              onChange={() => setFilter(true)}
            >Contacts</ToggleGroupItem>

            <ToggleGroupItem
              value="explore"
              aria-label="show all users"
              onChange={() => setFilter(false)}
            >Explore</ToggleGroupItem>
          </ToggleGroup>
          <div >
            {filter ?
              <ContactList contacts={contacts} />
              :
              users?.map((u) => {
                return (

                  <div>{u.name}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}
