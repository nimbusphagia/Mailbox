import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import type { ContactType } from "@/lib/schemas/contact.schema";
import { type SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType } from "@/lib/schemas/util.schema";
import { ContactList } from "./ContactList";
import { UsersList } from "./UsersList";

type Props = {
  contacts: ContactType[],
  users: SafeUser[],
  selected: UuidType[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void,
  selectContact: (userId: UuidType | null, checked: boolean) => void,
  onStartGroup: () => void,
}

export function ContactSearchPanel({ contacts, users, selected, addContactFn, createChatFn, selectContact, onStartGroup }: Props) {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");

  const filteredContacts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter(c =>
      (c.nickname ?? c.user?.name ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [contacts, query]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter(u =>
      (u.name ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [users, query]);

  return (
    <div className={`w-full`}>
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
        <Input
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 border-fg1 text-left text-md bg-bg2/95 rounded-sm text-fg1 placeholder:text-fg1/70 focus:bg-bg2"
        />

        {filter === "contacts" ?
          <ContactList
            contacts={filteredContacts}
            selectFn={selectContact}
          />
          :
          <UsersList
            users={filteredUsers}
            addFn={addContactFn}
          />
        }
      </div>
      <div
        className="flex items-center justify-between 
    *:font-semibold *:capitalize *:text-bg1 py-1 px-2
    *:border-1 *:border-fg2 *:bg-fg1/80 *:hover:bg-fg1 *:hover:text-bg2
    ">

        {
          selected.length > 1 ?
            <Button
              className="border-bg3"
              onClick={onStartGroup}
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
    </div>
  )
}
