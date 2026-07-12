import type { Message } from "@/pages/Home/Home";

type PillProps = {
  message: Message;
  className?: string,
}

export function MessagePill({ message, className }: PillProps) {
  const style = {
    "error": {
      prefix: "Error:",
      border: "border-red/80",
      color: "text-red",
      body: "",
    },
    "success": {
      prefix: "Success:",
      border: "border-bg4/80",
      color: "text-bg4",
      body: "",
    },
    "any": {
      prefix: "",
      border: "",
      color: "",
      body: "",
    }
  }

  return (
    <div className={`border-[1px]  bg-fg0/50 rounded-md p-3 flex gap-1 items-center ${style[message.type].border} ${className}`}>
      <p className={`text-xs font-semibold ${style[message.type].color}`}>{style[message.type].prefix}</p>
      <p className={`text-bg2 text-xs font-normal ${style[message.type]}`}>{message?.body}</p>
    </div>
  );
}
