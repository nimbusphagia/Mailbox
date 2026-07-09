import { ContactPage } from "../ChatInfo/Contact"
import { Chat } from "../Chat/Chat"
import type { GroupRes } from "@/lib/schemas/group.schema"
import { GroupPage } from "../ChatInfo/Group"
import { LogoRandom } from "@/components/LogoRandom"
import { Signature } from "@/components/Signature"
import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import type { NavigationReturn } from "../Home/hooks/useHomeNavigation"
import { ProfilePage } from "../Config/components/Profile"

type Props = {
  nav: NavigationReturn,
  profilePictures: ProfilePicture[]
}

export function MainContent({
  nav,
  profilePictures,

}: Props) {

  const {
    userInfo: user,
    showUserInfo: showProfile,
    activeChat: chat,
    activeContact: contact,
    showInfo,
    setShowInfo,
    actions,
    closeChat,
    closeInfo,
    emptyMain: isEmpty,
  } = nav;

  const { deleteGroup, leaveGroup, editProfile, editGroup, toggleArchived, toggleBlocked, editNickname, removeGroupMember } = actions


  if (isEmpty) return (
    <div className="w-full h-full flex items-center justify-center pt-5 p-4 pl-2">
      <div className="relative border-[1px] border-bg3 rounded-sm flex flex-col items-center justify-center size-full">
        <LogoRandom className="text-[0.8em]! text-bg3! font-black!" />
        <div className="absolute bottom-0">
          <Signature />
        </div>
      </div>
    </div>
  )
  if (user && showProfile) return (
    <ProfilePage
      user={user}
      profilePictures={profilePictures}
      onEdit={editProfile}
    />
  )
  if (chat) {
    if (contact && showInfo) return (
      <ContactPage
        contact={contact}
        images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
        archiveFn={() => toggleArchived(chat.id)}
        isArchived={chat.isArchived}
        hideFn={closeInfo}
        blockFn={toggleBlocked}
        nicknameFn={editNickname}
      />
    )

    if (chat.isGroup && showInfo) return (
      <GroupPage
        group={chat as GroupRes}
        images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
        profilePictures={profilePictures}
        archiveFn={() => toggleArchived(chat.id)}
        removeMemberFn={removeGroupMember}
        leaveGroupFn={leaveGroup}
        deleteGroupFn={deleteGroup}
        hideFn={closeInfo}
        onEdit={editGroup}
      />
    )
  }

  return (
    <Chat
      chat={chat!}
      sendFn={actions.createMessage}
      getContact={actions.getContact}
      showInfo={() => setShowInfo(true)}
      closeChat={closeChat}
    />
  )
}
