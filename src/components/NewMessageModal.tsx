import { useState } from "react";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import type { ContactType } from "@/lib/schemas/contact.schema";
import type { SafeUser } from "@/lib/schemas/user.schema";
import { ContactList } from "./ContactList";
import { UsersList } from "./UsersList";
import type { UuidType } from "@/lib/schemas/util.schema";

type Props = {
  hideFn: () => void,
  contacts: ContactType[],
  users: SafeUser[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void
  createGroupFn: (userId: UuidType[]) => void
}
export function NewMessageModal({ hideFn, contacts, users, addContactFn, createChatFn, createGroupFn }: Props) {
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");
  const [selected, setSelected] = useState<UuidType[]>([]);

  const selectContact = (userId: UuidType | null, checked: boolean) => {
    if (!userId) return;
    setSelected(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  }
  return (
    <Modal>
      <div className="z-10 flex-1 max-w-[30%] h-[clamp(40%,50%,600px) bg-fg3 px-4 py-2  flex flex-col  rounded-xs shadow-xs shadow-fg4">
        <div className="flex items-center justify-between ">
          <Button className="text-bg1 capitalize" onClick={hideFn}>Cancel</Button>
          {
            selected.length > 1 ?
              <Button
                className="text-bg1 capitalize"
                onClick={() => { createGroupFn(selected) }}
              >
                New Group
              </Button>
              :
              <Button
                className="text-bg1 capitalize"
                disabled={!selected.length}
                onClick={() => { createChatFn(selected[0]) }}
              >
                New Chat
              </Button>
          }
        </div>
        <div className="w-full m-auto p-2 flex flex-col gap-2">
          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full flex *:uppercase justify-around *:w-[35%] *:rounded-xs"
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
            >Explore</ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center justify-center">
            <input
              placeholder=":search"
              className="bg-fg4/70 p-1 px-2 text-sm  w-full outline-none border-xs focus:bg-fg4/30 focus:text-bg1"
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
      </div>
    </Modal>
  )
}
