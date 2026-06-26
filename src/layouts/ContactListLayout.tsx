import type { PropsWithChildren } from "react";

type Props = {
  fbText: string,
  isEmpty: boolean
}
export function ContactListLayout({ isEmpty, fbText, children }: PropsWithChildren<Props>) {
  return (
    <div className="h-full text-center overflow-y-scroll  rounded-sm
           border-fg4 border-[1px] p-2 flex flex-col gap-2.5
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {isEmpty ? children :
        <p className="h-fit text-center text-xs text-bg3 font-light w-[80%] m-auto">
          {fbText}
        </p>
      }
    </div>
  )
}
