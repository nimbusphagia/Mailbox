import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  backFn: () => void,
  label?: ReactNode,
}
export function ChatInfoLayout({ backFn, label, children }: PropsWithChildren<Props>) {
  return (
    <div className="relative box-border pr-2! flex-1 min-h-0 size-full grid grid-rows-[8%_1fr_auto] text-bg1 py-2">
      <div className="flex items-center px-2 gap-2 *:bg-fg2 *:rounded-sm
      *:px-2 *:py-1 *:border-[0.01em] *:border-fg3 *:text-bg1">
        <Button
          onClick={backFn}
          className="size-[1.8em] rounded-[100%]!">
          <ArrowLeft />
        </Button>
        {label}
      </div>
      <div
        className="flex justify-center m-2 bg-fg1 border-1 border-fg4 rounded-sm p-1.5
        overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-[55%] h-full self-center flex flex-col gap-2 py-3">
          {children}
        </div>
      </div>
    </div>
  )
}
