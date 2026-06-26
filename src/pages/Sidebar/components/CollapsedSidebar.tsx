import { MoveDiagonal2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  toggleSidebar: () => void,
}

export function CollapsedSidebar({ toggleSidebar }: Props) {
  return (
    <div className="max-h-fit flex items-start pl-2 pr-1 mt-4 justify-between 
  *:text-bg1 *:size-[2.5em] [&>button>*]:size-full *:rounded-full">
      <Button
        onClick={toggleSidebar}
      >
        <MoveDiagonal2 />
      </Button>
    </div>
  )
}
