import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ContactType } from "@/lib/schemas/contact.schema";
import { type SafeUser } from "@/lib/schemas/user.schema";
import { ContactList } from "./components/ContactList";
import { UsersList } from "./components/UsersList";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import { Modal } from "@/components/ui/modal";
import { Camera, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserThumbnail } from "@/components/UserThumbnail";

type Props = {
  hideFn: () => void,
  contacts: ContactType[],
  users: SafeUser[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void
  createGroupFn: (group: GroupReq, image?: ValidImage) => void
}
export function ChatPrompt({ hideFn, contacts, users, addContactFn, createChatFn }: Props) {
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");
  const [selected, setSelected] = useState<UuidType[]>([]);
  const [showGF, setShowGF] = useState<boolean>(false);
  const [groupMembers, setGroupMembers] = useState<ContactType[]>([]);
  const modalStyle = `h-[clamp(40%,50%,600px)
      bg-fg2 px-5 py-4 flex flex-col border-[0.1em] border-fg1/30 rounded-sm shadow-xs`

  const selectContact = (userId: UuidType | null, checked: boolean) => {
    if (!userId) return;
    setSelected(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  }
  const cleanSelection = () => {
    setShowGF(false);
    setSelected([]);
  }
  const unselectMember = (userId: UuidType) => {
    setSelected(selected.filter(s => s !== userId))
    setGroupMembers(groupMembers.filter(m => m.userId !== userId))
  }
  return (
    <Modal>
      <div className="translate-x-1/4 z-10">
        {showGF ?
          <div className={`w-[33vw] text-center font-bold flex flex-col gap-6 ${modalStyle}`}>
            <div className="flex gap-5 items-center ">
              <Input
                className="text-md bg-bg2/95 text-fg1 placeholder:text-fg1/70 focus:bg-bg2"
                placeholder="Name your group" />
              <Button
                className=" bg-fg1/80 shadow-sm h-full p-1 px-1.5 rounded-[3px] hover:bg-fg1 hover:*:text-bg2"
              >
                <Camera className="size-fit text-bg2/95 " />
              </Button>
            </div>
            <div className="flex flex-wrap flex-1 justify-evenly gap-x-4 gap-y-3.5 bg-bg3/85 rounded-xs p-4">
              {groupMembers.map(c =>
                c.user &&
                <div
                  key={c.id}
                  className="relative flex gap-2 items-center bg-fg4/90 p-2 px-4.5 rounded-md shadow-sm"
                >
                  <UserThumbnail
                    imgUrl={c.user.imgUrl!}
                    fullName={c.nickname ?? c.user.name}
                    className="text-bg1 text-[0.8rem]"
                  />
                  <Button
                    className="absolute top-1.5 left-1.5 size-fit p-0 hover:bg-transparent hover:*:text-bg0"
                    onClick={() => unselectMember(c.user!.id)}
                  >
                    <X className="text-bg2 size-[0.7rem]" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between *:text-bg1">
              <Button
                onClick={cleanSelection}
              >Return</Button>

              <Button
              >Create</Button>

            </div>
          </div>
          :
          <div className={`w-[32vw] ${modalStyle}`}>
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
                placeholder=":search"
                className=" text-left text-md bg-bg2/95 rounded-sm text-fg1 placeholder:text-fg1/70 focus:bg-bg2"
              />

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
        *:font-semibold *:capitalize *:text-bg1 py-1 px-2
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
                    onClick={() => {
                      setGroupMembers(contacts.filter(c => c.userId && selected.includes(c.userId)));
                      setShowGF(true);
                    }}
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
        }
      </div>
    </Modal >
  )
}
