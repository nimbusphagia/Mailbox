import { useEffect, useRef, useState } from "react";
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
import { PillAvatar } from "@/components/PillAvatar";

type Props = {
  hideFn: () => void,
  contacts: ContactType[],
  users: SafeUser[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void
  createGroupFn: (group: GroupReq, image?: ValidImage) => void
}
export function ChatPrompt({ hideFn, contacts, users, addContactFn, createChatFn, createGroupFn }: Props) {
  const [filter, setFilter] = useState<"contacts" | "users">("contacts");
  const [selected, setSelected] = useState<UuidType[]>([]);
  const [showGF, setShowGF] = useState<boolean>(false);
  const [groupMembers, setGroupMembers] = useState<ContactType[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [groupImage, setGroupImage] = useState<ValidImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalStyle = `h-[clamp(40%,50%,600px)
      bg-fg2 px-5 py-4 flex flex-col  
      rounded-sm shadow-xs border-1 border-fg1`

  const selectContact = (userId: UuidType | null, checked: boolean) => {
    if (!userId) return;
    setSelected(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  }
  const cleanSelection = () => {
    setShowGF(false);
    setSelected([]);
    setGroupImage(null);
    setGroupName("");
    setPreview(null);
  }
  const unselectMember = (userId: UuidType) => {
    setSelected(selected.filter(s => s !== userId))
    setGroupMembers(groupMembers.filter(m => m.userId !== userId))
  }
  useEffect(() => {
    if (!groupImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(groupImage);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [groupImage]);
  const submitCreate = () => {
    if (groupName === undefined || !selected.length) { return };
    const group: GroupReq = {
      name: groupName,
      members: selected,
    };
    createGroupFn(group, groupImage ?? undefined);
    cleanSelection();
    hideFn();
  }


  return (
    <Modal>
      <div className="translate-x-1/4 z-10">
        {showGF ?
          <div className={`w-[30vw] text-center font-bold flex flex-col gap-4 ${modalStyle}`}>
            <>
              {preview && (
                <div className="border-[0.1em] border-bg3 size-[55%] m-auto aspect-square rounded-full overflow-hidden">
                  <div className="relative size-full rounded-full overflow-hidden">
                    <Button
                      className="absolute top-0 right-0 m-auto"
                      onClick={() => setGroupImage(null)}
                    >remove</Button>
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full"
                    />
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setGroupImage(file);
                }}
              />

            </>
            <div className="flex gap-3 items-center *:bg-bg3 ">
              <Input
                className="text-[0.8em]! text-fg1 placeholder:text-fg1/70 focus:bg-bg2 border-2 border-fg1 rounded-sm"
                placeholder="Name your group"
                value={groupName}
                onChange={(e) => setGroupName(e.currentTarget.value)}
              />
              <Button
                className="h-full p-0.5 px-1 rounded-sm hover:bg-fg1 hover:*:text-bg2  
                border-2 border-fg1 "
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="size-fit text-fg1" />
              </Button>
            </div>
            <div className="flex flex-wrap flex-1 justify-evenly gap-x-4 gap-y-3.5 bg-bg3/85 rounded-sm p-3.5 border-2 border-fg1">
              {groupMembers.map(c =>
                c.user &&
                <PillAvatar
                  key={c.id}
                  name={c.nickname ?? c.user.name}
                  imgUrl={c.user.imgUrl!}
                  className="px-6"
                  avatarClassname="size-[1.3em]"
                >
                  <Button
                    className="absolute top-1.5 left-1.5 size-fit p-0 hover:bg-transparent hover:*:text-bg0"
                    onClick={() => unselectMember(c.user!.id)}
                  >
                    <X className="text-bg2 size-[0.6rem]" />
                  </Button>
                </PillAvatar>
              )}
            </div>
            <div className="flex justify-between *:text-bg1">
              <Button
                onClick={cleanSelection}
              >Return</Button>

              <Button
                onClick={submitCreate}
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
                className="border-2 border-fg1 text-left text-md bg-bg2/95 rounded-sm text-fg1 placeholder:text-fg1/70 focus:bg-bg2"
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
