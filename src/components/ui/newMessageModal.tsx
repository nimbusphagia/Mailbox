import { useState } from "react";
import { Button } from "./button";
import { Modal } from "./modal";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

type Props = {
  hideFn: () => void,
}
export function NewMessageModal({ hideFn }: Props) {
  const [filter, setFilter] = useState<boolean>(false);

  return (
    <Modal>
      <div className="flex-1 max-w-[35%] h-[clamp(40%,50%,600px)  bg-fg4 p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between ">
          <Button className="text-bg3 capitalize" onClick={hideFn}>Cancel</Button>
          <Button className="text-blue-dark/40 capitalize">New Message</Button>
        </div>
        <div className="w-full">
          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full flex *:flex-1"
            defaultValue="contacts"
          >
            <ToggleGroupItem
              value="contacts"
              aria-label="filter by contacts"
              className="rounded-none"
              onChange={() => setFilter(false)}
            >Contacts</ToggleGroupItem>

            <ToggleGroupItem
              value="explore"
              aria-label="show all users"
              className="first:rounded-none last:rounded-none"
              onChange={() => setFilter(true)}
            >Explore</ToggleGroupItem>
          </ToggleGroup>
          <div>

          </div>
        </div>
      </div>
    </Modal>
  )
}
