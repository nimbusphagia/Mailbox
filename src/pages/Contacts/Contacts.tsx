import { useState } from "react";
import type { ContactType } from "@/lib/schemas/contact.schema";
import { type SafeUser } from "@/lib/schemas/user.schema";
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema";
import type { GroupReq } from "@/lib/schemas/group.schema";
import { UsersPanel } from "./components/UsersPanel";
import { GroupCreateForm } from "./components/GroupCreateForm";
import type { ProfilePicture } from "@/lib/schemas/assets.schema";

type Props = {
  contacts: ContactType[],
  users: SafeUser[],
  addContactFn: (userId: UuidType) => void,
  createChatFn: (userId: UuidType) => void
  createGroupFn: (group: GroupReq, image?: ValidImage, asset?: ProfilePicture) => void
  profilePictures: ProfilePicture[],
  showSearchbar: (value: boolean) => void,
}

export function Contacts({ contacts, users, profilePictures, addContactFn, createChatFn, createGroupFn, showSearchbar }: Props) {
  const [selected, setSelected] = useState<UuidType[]>([]);
  const [showGF, setShowGF] = useState<boolean>(false);
  const [groupMembers, setGroupMembers] = useState<ContactType[]>([]);

  const selectContact = (userId: UuidType | null, checked: boolean) => {
    if (!userId) return;
    setSelected(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  }

  const cleanSelection = () => {
    showSearchbar(true);
    setShowGF(false);
    setSelected([]);
  }

  const unselectMember = (userId: UuidType) => {
    setSelected(selected.filter(s => s !== userId))
    setGroupMembers(groupMembers.filter(m => m.userId !== userId))
  }

  const handleCreate = (group: GroupReq, image?: ValidImage, asset?: ProfilePicture) => {
    createGroupFn(group, image, asset);
    cleanSelection();
  }

  return (
    <>
      {showGF ?
        <GroupCreateForm
          members={groupMembers}
          selected={selected}
          onUnselectMember={unselectMember}
          onReturn={cleanSelection}
          onCreate={handleCreate}
          profilePictures={profilePictures}
        />
        :
        <UsersPanel
          contacts={contacts}
          users={users}
          selected={selected}
          addContactFn={addContactFn}
          createChatFn={createChatFn}
          selectContact={selectContact}
          onStartGroup={() => {
            setGroupMembers(contacts.filter(c => c.userId && selected.includes(c.userId)));
            showSearchbar(false);
            setShowGF(true);
          }}
        />
      }
    </>
  )
}
