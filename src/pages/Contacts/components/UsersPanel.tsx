import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ContactType } from "@/lib/schemas/contact.schema";
import { type SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import { ContactList } from "./ContactList";
import { UsersList } from "./UsersList";
import { MailPlus } from "lucide-react";

type Props = {
  contacts: ContactType[],
  users: SafeUser[],
  selected: UuidType[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void,
  selectContact: (userId: UuidType | null, checked: boolean) => void,
  onStartGroup: () => void,
}

export function UsersPanel({ contacts, users, selected, addContactFn, createChatFn, selectContact, onStartGroup }: Props) {
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");

  return (
    <div className="w-full h-full p-2 flex flex-col gap-3">
      <div className="w-full grid grid-cols-[1fr_auto] gap-3 *:h-full!">
        <ToggleGroup
          variant="outline"
          type="single"
          className="w-full gap-4 *:flex-1 *:text-[0.8em] *:border-1"
          value={filter}
          onValueChange={(val: "contacts" | "users") => val && setFilter(val)}
        >
          <ToggleGroupItem value="contacts" aria-label="filter by contacts">Contacts</ToggleGroupItem>
          <ToggleGroupItem value="users" aria-label="show all users">Find</ToggleGroupItem>
        </ToggleGroup>
        <Button
          className="relative h-full aspect-square p-0 text-bg3! bg-transparent text-xs border-[1px]! border-bg3 rounded-full hover:border-bg4!"
          disabled={!selected.length}
          onClick={() => { selected.length > 1 ? onStartGroup() : createChatFn(selected[0]) }}
          title={selected.length > 1 ? "Create group" : "Send a message"}
        >
          <MailPlus className="size-[1.5em]" />
          <div className={`absolute size-[10px] flex items-center text-bg3 
          justify-center bg-fg1 rounded-full  border-bg3 p-2 -left-[7px] -bottom-[6px] ${selected.length > 1 ? "text-bg4! font-semibold" : ""} `}>
            <p className="leading-none font-medium text-[0.8em]">{selected.length}</p>
          </div>
        </Button>
      </div>
      {filter === "contacts" ?
        <ContactList
          contacts={contacts}
          selectFn={selectContact}
          selected={selected}
        />
        :
        <UsersList
          users={users}
          addFn={addContactFn}
        />
      }
    </div>
  )
}
