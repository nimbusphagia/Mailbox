import type { Message } from "@/pages/Home/Home";

type PillProps = {
  message?: Message;
  className?: string,
}

export function MessagePill({ message, className }: PillProps) {
  return (
    <div className={`border-[1px] border-red/80 bg-fg0/50 rounded-md p-3 flex gap-1 items-center ${className}`}>
      {message?.type === "error" &&
        <p className="text-xs font-semiblod text-red underline">Error:</p>
      }
      <p className="text-bg2 text-xs font-semibold">{message?.body}</p>
    </div>
  );
}
