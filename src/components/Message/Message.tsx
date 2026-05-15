import type { Message } from "@/lib/schemas/message.schema"
import type { SafeUser } from "@/lib/schemas/user.schema"
import { NameTag } from "../ui/NameTag";
import { useRef, useState, type RefObject } from "react";
import { formatDate } from "@/lib/utils";

type Props = {
  message: Message,
  primary: SafeUser,
  secondary: SafeUser,
  reference?: RefObject<HTMLDivElement | null>,
}

export function MessageComponent({ message, primary, secondary, reference }: Props) {
  const isPrimary = message.senderId === primary.id;
  const [showDetails, setShowDetails] = useState<boolean>(false);
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
      className={` w-full flex flex-col  ${isPrimary ? "items-end" : "items-start"}`}
      ref={reference ?? undefined}
    >
      <div
        className={`
         w-fit max-w-[62%] py-1 px-4 pb-3 rounded-sm
        text-sm flex flex-col gap-1 font-medium cursor-pointer
        ${isPrimary ? "items-end bg-bg2/35 hover:bg-bg2/45 " : "items-start bg-fg2/90 hover:bg-fg2"}
        `}
        onClick={handleClick}
      >
        <NameTag
          name={isPrimary ? primary.name : secondary.name}
          style={isPrimary ? "text-fg1 decoration-fg1/80" : "text-bg1 decoration-bg1/70"}
        />
        <div className="w-full text-pretty ">
          <p
            className={`text-sm text-justify w-fit m-auto font-bold ${isPrimary ? "text-fg1" : "text-bg1"}`}>
            {message.content}
          </p>
        </div>

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

