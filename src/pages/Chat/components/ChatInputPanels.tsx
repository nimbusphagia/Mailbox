import { Button } from "@/components/ui/button"
import type { Message } from "@/lib/schemas/message.schema"
import { X } from "lucide-react"

type PreviewPanelProps = {
  preview: string
  onClear: () => void
}

export function PreviewPanel({ preview, onClear }: PreviewPanelProps) {
  return (
    <div className="relative w-full rounded-t-sm p-1 pt-4">
      <Button
        className="absolute top-2.5 right-3 text-bg3 hover:text-bg2
          hover:bg-transparent border-none bg-transparent p-1"
        onClick={onClear}
      >
        <X className="size-[0.9em]" />
      </Button>
      <div className="max-w-[35%] max-h-full m-auto flex w-fit justify-center 
      items-center border-1 border-bg3 rounded-sm">
        <img src={preview} alt="Preview" className="" />
      </div>
    </div>
  )
}

type ReplyPanelProps = {
  userName: string
  message: Message
  onClear: () => void
}

export function ReplyPanel({ userName, message, onClear }: ReplyPanelProps) {
  return (
    <div className="relative w-full rounded-t-sm">
      <div className="max-size-full p-2">
        <Button
          className="absolute top-2.5 right-3 text-bg3 hover:text-bg2
          hover:bg-transparent border-none bg-transparent p-1"
          onClick={onClear}
        >
          <X className="size-[0.9em]" />
        </Button>
        <div className="bg-fg2 border-1 border-fg4 p-[0.5em] max-w-full max-h-[100px] flex justify-between rounded-xs">
          <div className="border-l-[1.5px] border-bg1 pl-1.5 flex flex-col gap-0.5">
            <p className="font-medium text-sm">{userName}</p>
            <p className="text-xs font-normal">
              {message.content?.trim() ? message.content : "Photo"}
            </p>
          </div>
          {message.type === "IMAGE" && (
            <div className="max-w-[180px] max-h-[150px] border-1 border-bg2 p-1 rounded-sm flex justify-center mr-5">
              <img src={message.metadata?.url} alt="Preview" className="max-h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
