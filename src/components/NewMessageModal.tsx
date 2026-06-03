import { useState } from "react";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ContactList } from "./ContactList";
import { UsersList } from "./UsersList";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";

type Props = {
  hideFn: () => void,
  contacts: ContactType[],
  users: SafeUser[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void
  createGroupFn: (group: GroupReq, image?: ValidImage) => void
}
export function NewMessageModal({ hideFn, contacts, users, addContactFn, createChatFn }: Props) {
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");
  const [selected, setSelected] = useState<UuidType[]>([]);
  const [showGF, setShowGF] = useState<boolean>(false);

  const selectContact = (userId: UuidType | null, checked: boolean) => {
    if (!userId) return;
    setSelected(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  }
  return (
    <div className="translate-x-1/4 z-10 flex-1 max-w-[33%] h-[clamp(40%,50%,600px)
      bg-fg2 px-4 py-3 flex flex-col border-[0.1em] border-fg1/30 rounded-xs shadow-xs">
      {showGF ?
        <div>
          <h3>Create Group</h3>
          <Button

          >Do it</Button>
        </div>
        :
        <>
          <div className="w-full m-auto p-2 flex flex-col gap-3">
            <ToggleGroup
              variant="outline"
              type="single"
              className="w-full flex *:capitalize justify-around pb-1 *:w-[35%] *:rounded-xs *:text-sm"
              value={filter}
              onValueChange={(val: "contacts" | "users") => val && setFilter(val)}
            >
              <ToggleGroupItem
                value="contacts"
                aria-label="filter by contacts"
              >Contacts</ToggleGroupItem>

              <ToggleGroupItem
                value="users"
                aria-label="show all users"
              >Find</ToggleGroupItem>
            </ToggleGroup>
            <div
              className="flex items-center justify-center">
              <input
                placeholder=":search"
                className="bg-bg4/60 p-1 px-2 text-sm  w-full outline-none 
              border-[0.1em] border-fg3 rounded-xs font-bold focus:bg-fg4 focus:text-bg1"
              />
            </div>

            {filter === "contacts" ?
              <ContactList
                contacts={contacts}
                selectFn={selectContact}
              />
              :
              <UsersList
                users={users}
                addFn={addContactFn}
              />
            }
          </div>
          <div
            className="flex items-center justify-between 
        *:font-semibold *:capitalize *:text-bg3 py-1 px-2
        *:border-1 *:border-fg2 *:bg-fg1/80 *:hover:bg-fg1 *:hover:text-bg2
        ">
            <Button
              className=""
              onClick={hideFn}>
              Cancel
            </Button>
            {
              selected.length > 1 ?
                <Button
                  className="border-bg3"
                  onClick={() => { setShowGF(true) }}
                >
                  {`New Group(${selected.length})`}
                </Button>
                :
                <Button
                  className="border-bg3"
                  disabled={!selected.length}
                  onClick={() => { createChatFn(selected[0]) }}
                >
                  New Chat
                </Button>
            }
          </div>
        </>
      }
    </div>
  )
}
