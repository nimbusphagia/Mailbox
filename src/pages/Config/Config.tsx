import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Ban, DoorOpen, UserPen } from "lucide-react";
import { useState } from "react";

type ProfileView = "edit" | "blocked";
type Props = {
  showProfile: () => void,
  showBlocked: () => void,
  logoutFn: () => void,
}

export function ConfigPanel({ showProfile, showBlocked, logoutFn }: Props) {
  const [view, setView] = useState<ProfileView>("edit");
  const buttonStyle = `w-full flex justify-between gap-4 text-bg3 text-xs! font-normal! 
  text-left border-[1px] border-fg4 bg-fg1/40 rounded-sm p-4!`;
  return (
    <div className="relative w-full h-full flex flex-col p-2">
      <ToggleGroup
        variant="outline"
        type="single"
        className="w-full h-full gap-3 flex-col p-2 border-[1px] border-fg4! rounded-sm *:data-[state=on]:border-bg3! *:data-[state=off]:bg-fg1/20 *:data-[state=on]:bg-fg0/30! *:data-[state=on]:text-bg2! *:hover:border-bg2/70 *:hover:text-bg2 "
        value={view}
        onValueChange={(val: ProfileView) => val && setView(val)}
      >
        <ToggleGroupItem
          onClick={showProfile}
          value="edit"
          className={buttonStyle}
        >
          Account
          <UserPen />
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={showBlocked}
          value="blocked"
          className={buttonStyle}
        >
          Blocked contacts
          <Ban />
        </ToggleGroupItem>
      </ToggleGroup>
      <div
        className="mt-auto pt-2 *:text-sm *:text-bg3 *:underline *:decoration-[0.1em] flex flex-col gap-2 items-center"
      >
        <Button
          onClick={logoutFn}
          className={`decoration-0! ${buttonStyle} bg-transparent! hover:border-bg3! hover:text-bg1! hover:bg-fg1/50!`}>
          Logout
          <DoorOpen />
        </Button>
      </div>
    </div>
  )
}
