import type { PropsWithChildren } from "react";

type Props = {
  fbText: string,
  isEmpty: boolean
}
export function ModalListLayout({ isEmpty, fbText, children }: PropsWithChildren<Props>) {
  return (
    <div className=" flex flex-col *:flex1 min-h-65 max-h-80 h-fit rounded-sm overflow-y-scroll p-2 
    py-3 gap-2 border-2 border-fg1">
      {isEmpty ? children :
        <p className="text-center text-sm text-fg2 w-[80%] mb-30 m-auto">
          {fbText}
        </p>
      }
    </div>
  )
}
