import type { Message } from "@/lib/schemas/message.schema"
import type { SafeUser, ChatUser } from "@/lib/schemas/user.schema"
import { NameTag } from "./ui/NameTag";
import { useRef, useState, type RefObject } from "react";
import { formatDate } from "@/lib/utils";
import { Ellipsis, Reply } from "lucide-react";

type Props = {
  message: Message,
  primary: SafeUser,
  secondary: ChatUser | null,
  reference?: RefObject<HTMLDivElement | null>,
  replyFn: (m: Message, u?: ChatUser) => void,
}

export function MessageComponent({ message, primary, secondary, reference, replyFn }: Props) {
  const isPrimary = message.senderId === primary.id;
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const next = !showDetails;
    setShowDetails(next);
    if (next) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    }
  };

  return (
    <div
      className={` w-full flex flex-col`}
      ref={reference ?? undefined}
    >
      <div
        className={`w-full flex flex gap-2 ${isPrimary ? "justify-end" : "justify-start"}`}
        onMouseEnter={() => setShowMore(true)}
        onMouseLeave={() => setShowMore(false)}
      >
        {isPrimary && showMore
          && <Ellipsis
            className="cursor-pointer self-center size-[1.1em] text-bg3/90 hover:text-bg2"
            onClick={() => null}
          />
        }
        <div
          className={`
         w-fit max-w-[62%] py-1 px-4 pb-2 rounded-sm
        text-sm flex flex-col gap-1 font-medium cursor-pointer
        ${isPrimary ? "items-end bg-bg1/70 hover:bg-bg1/75 " : "items-start bg-fg2 hover:bg-fg1/85"}
        `}
          onClick={handleClick}
        >
          <NameTag
            name={isPrimary ? primary.name : (secondary ? secondary.nickname ?? secondary.name : "User")}
            style={isPrimary ? "text-fg1 decoration-fg1/80" : "text-bg1 decoration-bg1/70"}
          />
          <div className="w-full text-pretty">
            {message.type === 'IMAGE' &&
              <div className="py-2 ">
                <img
                  src={message.metadata?.url ?? ""}
                  className="rounded-xs"
                />
              </div>
            }
            <p
              className={`text-sm  pl-1 w-full m-auto font-bold ${isPrimary ? "text-fg1" : "text-bg1 "}`}>
              {message.content}
            </p>
          </div>

        </div>
        {!isPrimary && showMore
          &&
          <>
            <Reply
              className="cursor-pointer self-center size-[1.1em] text-bg3/90 hover:text-bg2"
              onClick={() => replyFn(message, secondary ?? undefined)}
            />
            <Ellipsis
              className="cursor-pointer self-center size-[1.1em] text-bg3/90 hover:text-bg2"
              onClick={() => null}
            />
          </>
        }
      </div>
      <div
        ref={detailsRef}
        className={`
          px-2 overflow-hidden transition-all duration-300 ease-in-out
          ${showDetails ? "max-h-10 opacity-100 py-0.5" : "max-h-0 opacity-0 py-0"}
          ${isPrimary ? "self-end" : "self-start"}
        `}
      >
        <p
          className="text-[0.6em] font-semibold text-bg2"
        >
          {formatDate(new Date(message.createdAt))}
        </p>
      </div>

    </div>
  )
}

