import type { Message } from "@/pages/Home/Home";

type PillProps = {
  message: Message;
  className?: string,
}

export function MessagePill({ message, className }: PillProps) {
  const style = {
    "error": {
      prefix: "Error:",
      border: "border-red",
      color: "text-red",
      body: "",
    },
    "success": {
      prefix: "Success:",
      border: "border-bg4",
      color: "text-bg4",
      body: "",
    },
    "any": {
      prefix: "",
      border: "border-bg2",
      color: "",
      body: "",
    }
  }

  return (
    <div className={`border-[1px]  bg-fg1 opacity-[0.9] rounded-md p-3 flex gap-1 items-center shadow-lg ${style[message.type].border} ${className}`}>
      <p className={`text-xs font-semibold ${style[message.type].color}`}>{style[message.type].prefix}</p>
      <p className={`text-bg2 text-xs font-normal ${style[message.type]}`}>{message?.body}</p>
    </div>
  );
}
