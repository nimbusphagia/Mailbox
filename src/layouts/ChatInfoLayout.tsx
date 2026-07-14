import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  backFn: () => void,
  label?: ReactNode,
}
export function ChatInfoLayout({ backFn, label, children }: PropsWithChildren<Props>) {
  return (
    <div className="relative box-border pr-2! min-h-0 max-w-full flex flex-col gap-4 m-4 ml-0 text-bg1">
      <header className="flex items-center  gap-2 *:bg-fg2 *:rounded-sm
      *:px-2 *:py-1 *:border-[0.01em] *:border-fg3 *:text-bg1">
        <Button
          onClick={backFn}
          className="size-[1.8em] rounded-[100%]!">
          <ArrowLeft />
        </Button>
        {label}
      </header>
      <main
        className="flex flex-1 flex-col gap-2 mr-2 m-0 justify-center bg-fg1 border-1 border-fg4 rounded-sm 
        overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-[55%] h-full self-center flex flex-col gap-2 py-3 p-1.5">
          {children}
        </div>
      </main>
    </div>
  )
}
