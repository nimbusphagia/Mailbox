import type { Message } from "@/lib/schemas/message.schema"
import type { SafeUser, ChatUser } from "@/lib/schemas/user.schema"
import { NameTag } from "@/components/ui/NameTag"
import { useRef, useState, type RefObject } from "react"
import { formatDate } from "@/lib/utils"
import { Ellipsis, Reply } from "lucide-react"

type Props = {
  message: Message
  primary: SafeUser
  secondary: ChatUser | null
  reference?: RefObject<HTMLDivElement | null>
  replyFn: (m: Message, name: string) => void
}
function ReplyPreview({ replyTo }: { replyTo: NonNullable<Message["replyTo"]> }) {
  return (
    <div className="relative bg-fg0/60 w-full my-1 mx-0 rounded-xs">
      <div className="p-[0.5em] max-w-full max-h-[100px] flex justify-between gap-2">
        <div className="border-l-[1.5px] border-bg4 *:text-bg2 pl-2 flex flex-col gap-0.5">
          <p className="font-medium text-sm">
            {replyTo.sender.nickname ?? replyTo.sender.name ?? "Unknown user"}
          </p>
          <p className="text-xs font-semibold">
            {replyTo.content?.trim() ? replyTo.content : "Photo"}
          </p>
        </div>
        {replyTo.type === "IMAGE" && (
          <div className="max-w-[180px] max-h-[150px]">
            <img src={replyTo.metadata?.url} alt="Preview" className="max-h-full" />
          </div>
        )}
      </div>
    </div>
  )
}

function MessageActions({ isPrimary, onReply, onMore }: {
  isPrimary: boolean
  onReply: () => void
  onMore: () => void
}) {
  const iconBase = "cursor-pointer self-center size-[1.1em]"
  const color = isPrimary ? "text-bg3 hover:text-bg1" : "text-bg3/90 hover:text-bg2"

  const reply = <Reply className={`${iconBase} ${color}`} onClick={onReply} />
  const more = <Ellipsis className={`${iconBase} ${color}`} onClick={onMore} />

  return (
    <div className={`flex gap-2`}>
      {
        isPrimary ?
          <>{more}{reply}</>
          : <>{reply}{more}</>
      }
    </div>)
}

function MessageBody({ message, isPrimary }: { message: Message; isPrimary: boolean }) {
  return (
    <div className="w-full text-pretty">
      {message.type === "IMAGE" && (
        <div className="py-2">
          <img src={message.metadata?.url ?? ""} className="rounded-xs" />
        </div>
      )}
      <p className={`text-[0.9em] w-full m-auto font-normal ${isPrimary ? "text-bg2" : "text-bg1"}`}>
        {message.content}
      </p>
    </div>
  )
}

export function MessageComponent({ message, primary, secondary, reference, replyFn }: Props) {
  const isPrimary = message.senderId === primary.id
  const [showDetails, setShowDetails] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  const detailsVisible = "max-h-10 opacity-100 py-0.5"
  const detailsHidden = "max-h-0 opacity-0 py-0"
  const bubbleBase = "w-fit max-w-[62%] py-1 px-4 pb-2 rounded-md bg-fg2/30 shadow-xs border-[1px] border-fg3 text-sm flex flex-col gap-1 font-medium cursor-pointer hover:bg-fg2/40 hover:border-bg3/50"

  const senderName = isPrimary
    ? primary.name
    : secondary?.nickname ?? secondary?.name ?? "Unknown User"

  const displayName = isPrimary
    ? primary.name
    : secondary ? secondary.nickname ?? secondary.name : "User"

  const handleClick = () => {
    const next = !showDetails
    setShowDetails(next)
    if (next) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 120)
    }
  }

  return (
    <div className="w-full flex flex-col" ref={reference ?? undefined}>
      <div
        className={`w-full flex flex gap-2 ${isPrimary ? "justify-end" : "justify-start"}`}
        onMouseEnter={() => setShowMore(true)}
        onMouseLeave={() => setShowMore(false)}
      >
        {showMore && isPrimary && (
          <MessageActions
            isPrimary={isPrimary}
            onReply={() => replyFn(message, senderName)}
            onMore={() => null}
          />
        )}
        <div
          className={`${bubbleBase} ${isPrimary ? "items-end" : "items-start"}`}
          onClick={handleClick}
        >
          <NameTag
            name={displayName}
            style={isPrimary ? "text-bg2 decoration-bg2/80" : "text-bg4 decoration-bg4/80"}
          />
          {message.replyTo && <ReplyPreview replyTo={message.replyTo} />}
          <MessageBody message={message} isPrimary={isPrimary} />
        </div>
        {showMore && !isPrimary && (
          <MessageActions
            isPrimary={isPrimary}
            onReply={() => replyFn(message, senderName)}
            onMore={() => null}
          />
        )}

      </div>

      <div
        ref={detailsRef}
        className={`px-2 overflow-hidden transition-all duration-300 ease-in-out
          ${showDetails ? detailsVisible : detailsHidden}
          ${isPrimary ? "self-end" : "self-start"}`}
      >
        <p className="text-[0.6em] font-semibold text-bg2">
          {formatDate(new Date(message.createdAt))}
        </p>
      </div>
    </div>
  )
}
