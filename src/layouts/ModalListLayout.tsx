import type { PropsWithChildren } from "react";

type Props = {
  fbText: string,
  isEmpty: boolean
}
export function ModalListLayout({ isEmpty, fbText, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col *:flex1 min-h-65 max-h-65 p-1 h-fit rounded-xs bg-fg4 overflow-y-scroll">
      {isEmpty ? children :
        <p className="text-center text-sm text-bg2/70 w-[80%] mb-30 m-auto">
          {fbText}
        </p>
      }
    </div>
  )
}
