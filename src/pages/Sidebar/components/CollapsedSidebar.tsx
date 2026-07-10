import { MoveDiagonal2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  toggleSidebar: () => void,
}

export function CollapsedSidebar({ toggleSidebar }: Props) {
  return (
    <div className="h-full grid grid-rows-[8%_1fr_auto] m-2 mr-0 *:text-bg1">
      <Button
        onClick={toggleSidebar}
        className="size-fit self-center grid-row-1 rounded-full! p-[8px]! overflow-hidden! bg-fg0/40 border-transparent
hover:bg-fg0/70!
        "
      >
        <MoveDiagonal2 className="size-[0.85rem] text-bg2! " strokeWidth={2.2} />
      </Button >
    </div >
  )
}
