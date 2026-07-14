import { MoveDiagonal2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  toggleSidebar: () => void,
}

export function CollapsedSidebar({ toggleSidebar }: Props) {
  return (
    <div className="h-full flex flex-col gap-4 my-4 mx-2 *:text-bg1">
      <Button
        onClick={toggleSidebar}
        className="size-fit self-center my-1 grid-row-1 rounded-full! p-[8px]! overflow-hidden! bg-fg0/40 border-transparent
hover:bg-fg0/70!
        "
      >
        <MoveDiagonal2 className="size-[0.9rem] text-bg2! " strokeWidth={2.2} />
      </Button >
    </div >
  )
}
