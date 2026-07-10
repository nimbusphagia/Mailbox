import { ContactPage } from "../ChatInfo/Contact"
import { Chat } from "../Chat/Chat"
import { GroupPage } from "../ChatInfo/Group"
import { LogoRandom } from "@/components/LogoRandom"
import { Signature } from "@/components/Signature"
import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import type { NavigationReturn } from "../Home/hooks/useHomeNavigation"
import { ProfilePage } from "../Config/components/Profile"
import { BlockedContacts } from "../Config/components/BlockedContacts"

type Props = {
  nav: NavigationReturn,
  profilePictures: ProfilePicture[]
}

export function MainContent({ nav, profilePictures }: Props) {
  const { view, actions, closeChat, hideInfo } = nav;
  const { deleteGroup, leaveGroup, editProfile, editGroup, toggleArchived, toggleBlocked, editNickname, removeGroupMember } = actions;

  switch (view.screen) {
    case "empty":
      return (
        <div className="w-full h-full flex items-center justify-center pt-5 p-4 pl-2">
          <div className="relative border-[1px] border-bg3 rounded-sm flex flex-col items-center justify-center size-full">
            <LogoRandom className="text-[0.8em]! text-bg3! font-black!" />
            <div className="absolute bottom-0"><Signature /></div>
          </div>
        </div>
      );

    case "profile":
      return <ProfilePage user={view.user} profilePictures={profilePictures} onEdit={editProfile} />;

    case "contactInfo":
      return (
        <ContactPage
          contact={view.contact}
          images={view.chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
          archiveFn={() => toggleArchived(view.chat.id)}
          isArchived={view.chat.isArchived}
          hideFn={hideInfo}
          blockFn={toggleBlocked}
          nicknameFn={editNickname}
        />
      );

    case "groupInfo":
      return (
        <GroupPage
          group={view.chat}
          images={view.chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
          profilePictures={profilePictures}
          archiveFn={() => toggleArchived(view.chat.id)}
          removeMemberFn={removeGroupMember}
          leaveGroupFn={leaveGroup}
          deleteGroupFn={deleteGroup}
          hideFn={hideInfo}
          onEdit={editGroup}
        />
      );

    case "chat":
      return (
        <Chat
          chat={view.chat}
          sendFn={actions.createMessage}
          getContact={actions.getContact}
          showInfo={() => {
            if (view.chat.isGroup) nav.showGroupInfo();
          }}
          closeChat={closeChat}
        />
      );
    case "blockedContacts":
      return (
        <BlockedContacts
          contacts={view.contacts}
          unblockFn={toggleBlocked}
        />
      );

  }
}
