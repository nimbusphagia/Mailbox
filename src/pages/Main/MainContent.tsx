import type { ChatRes } from "@/lib/schemas/chat.schema"
import type { ContactType } from "@/lib/schemas/contact.schema"
import type { homeActionsReturn } from "../Home/hooks/useHomeActions"
import { ContactPage } from "../ChatInfo/Contact"
import { Chat } from "../Chat/Chat"
import type { UuidType } from "@/lib/schemas/util.schema"
import type { GroupRes } from "@/lib/schemas/group.schema"
import { GroupPage } from "../ChatInfo/Group"
import { LogoRandom } from "@/components/LogoRandom"
import { Signature } from "@/components/Signature"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { ProfilePage } from "../Profile/Profile"

type Props = {
  isLoading: boolean,
  isEmpty: boolean,
  chat?: ChatRes | GroupRes | null,
  contact?: ContactType | null,
  user?: SafeUser | null,
  actions: homeActionsReturn,
  showInfo: boolean,
  showProfile: boolean,
  onShowInfo: () => void,
  closeInfo: () => void,
  closeChat: () => void,
  editNickname: (id: UuidType, nickname: string | null) => void,
}

export function MainContent({
  chat,
  contact,
  actions,
  user,
  showProfile,
  showInfo,
  onShowInfo,
  closeInfo,
  closeChat,
  editNickname,
  isLoading,
  isEmpty
}: Props) {
  if (isLoading) return (
    <h1>LOADING</h1>
  )
  if (isEmpty) return (
    <div className="w-full h-full flex items-center justify-center py-5 pl-2 pr-5">
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
    />
  )
  if (chat) {
    if (contact && showInfo) return (
      <ContactPage
        contact={contact}
        images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
        hideFn={closeInfo}
        nicknameFn={editNickname}
      />
    )

    if (chat.isGroup && showInfo) return (
      <GroupPage
        group={chat as GroupRes}
        images={chat.messages.filter(m => m.type === "IMAGE").map(m => m.metadata!.url ?? null)}
        hideFn={closeInfo}
        titleFn={editNickname}
      />
    )
  }

  return (
    <Chat
      chat={chat!}
      sendFn={actions.createMessage}
      getContact={actions.getContact}
      showInfo={onShowInfo}
      closeChat={closeChat}
    />
  )
}
