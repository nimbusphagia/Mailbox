import { Messages } from "./components/Messages"
import { Button } from "@/components/ui/button"
import { UserThumbnail } from "@/components/UserThumbnail"
import type { ChatRes } from "@/lib/schemas/chat.schema"
import type { GroupRes } from "@/lib/schemas/group.schema"
import type { Message, MessageCreate } from "@/lib/schemas/message.schema"
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema"
import { ArrowLeft, Image, SendHorizontal } from "lucide-react"
import { useEffect, useRef } from "react"
import { PreviewPanel, ReplyPanel } from "./components/ChatInputPanels"
import { useMessageSubmit } from "./hooks/useMessageSubmit"

const isGroup = (chat: ChatRes | GroupRes): chat is GroupRes => chat.isGroup === true

type Props = {
  chat: ChatRes | GroupRes
  sendFn: (message: MessageCreate, image?: ValidImage) => void
  getContact: (userId: UuidType) => void
  showInfo: () => void,
  closeChat: () => void,
}

export function Chat({ chat, sendFn, getContact, showInfo, closeChat }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const groupChat = isGroup(chat) ? chat : null
  const directChat = isGroup(chat) ? null : chat

  const {
    textValue, setTextValue,
    image, setImage,
    preview,
    replying, setReplying,
    fileInputRef,
    submitMessage,
    submitText,
  } = useMessageSubmit(chat, sendFn)

  useEffect(() => {
    setReplying(null)

    const el = scrollRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      el.scrollTop = el.scrollHeight
    })
    observer.observe(el)

    const timeout = setTimeout(() => observer.disconnect(), 300)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [chat.messages])

  const handleShowInfo = () => {
    if (!groupChat) getContact(directChat!.secondaryMember.id)
    showInfo()
  }

  return (
    <main className="relative box-border flex-1 min-h-0 size-full grid grid-rows-[8%_1fr_auto] text-bg1 py-2">
      <div className="flex items-center px-2 gap-2 *:bg-fg2 *:rounded-sm
      *:px-2 *:py-1 *:border-[0.01em] *:border-fg3 *:text-bg1">
        <Button
          onClick={closeChat}
          className="size-[1.8em] rounded-[100%]!">
          <ArrowLeft />
        </Button>
        <UserThumbnail
          imgUrl={groupChat ? groupChat.imgUrl : directChat!.secondaryMember?.imgUrl}
          fullName={groupChat ? groupChat.name : (directChat!.secondaryMember.nickname ?? directChat!.secondaryMember.name)}
          className="gap-2!"
          textClassName="text-bg0! text-sm"
          avatarClassname="size-[1.8em] "
          showFn={handleShowInfo}
        />
      </div>

      <div
        className="flex flex-col gap-2 m-2 bg-fg0/20 border-1 border-fg3 rounded-sm p-1.5
        overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Messages
          scrollRef={scrollRef}
          isGroup={isGroup(chat)}
          title={groupChat?.name}
          imgUrl={groupChat?.imgUrl}
          messages={chat.messages}
          primary={chat.primaryMember}
          secondary={directChat?.secondaryMember ?? null}
          secondaryMembers={groupChat?.secondaryMembers ?? []}
          createdAt={chat.createdAt}
          replyFn={(message: Message, userName: string) => setReplying({ message, userName })}
        />

        {
          directChat?.isBlocked ?
            <div className="w-full my-2 flex justify-center items-center">
              <div className="h-[30px] w-[99%] rounded-sm bg-fg2/50 text-xs text-bg3 font-normal flex items-center justify-center">
                <p>Chat is disabled.</p>
              </div>
            </div> :
            <div className="flex flex-col m-1 gap-2 flex-1 bg-fg0/75 rounded-sm shadow-md">
              {preview && <PreviewPanel preview={preview} onClear={() => setImage(null)} />}
              {replying && <ReplyPanel {...replying} onClear={() => setReplying(null)} />}

              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 p-1.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setImage(f) }}
                  />
                  <Button
                    className="text-md text-bg3 p-1.5 flex items-center justify-center
                border-none bg-transparent hover:bg-fg1 hover:text-bg2!"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="w-[1.2em]" />
                  </Button>
                  <input
                    className="p-1 px-3 text-[0.8em] flex-1 outline-none text-bg1 border-1 border-transparent
                focus:placeholder:text-bg2 focus:text-bg1 focus:border-fg3 focus:bg-fg2/10 rounded-sm"
                    placeholder="Write a message"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitText() } }}
                  />
                  <Button
                    className="text-bg2 border-transparent bg-transparent p-1 enabled:text-bg2!"
                    disabled={!(image || textValue.length)}
                    onClick={submitMessage}
                  >
                    <SendHorizontal className="size-[1rem]" />
                  </Button>
                </div>
              </div>
            </div>
        }
      </div>
    </main>
  )
}
