import type { SafeUser } from "@/lib/schemas/user.schema"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowLeft, DoorOpen, UserRoundPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Signature } from "@/components/Signature"
import { useState } from "react"

type Props = {
  user: SafeUser,
  closeFn: () => void,
  handleLogout: () => void,
}
export function ProfilePage({ user, closeFn, handleLogout }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);



  return (
    <div
      className="mt-2 mr-4 ml-2 pt-3 pb-4 rounded-sm flex flex-col 
      gap-4 *:rounded-sm">
      <header
        className="flex items-center gap-2 *:bg-fg2 
      *:rounded-sm *:p-2 *:border-[0.01em] *:border-fg3 *:text-bg1
        ">
        <Button
          onClick={closeFn}
          className="size-[1.8em] p-1 rounded-[100%]!">
          <ArrowLeft />
        </Button>
        <div className="flex gap-2 items-center">
          <UserRoundPen className="size-[1em]" />
          <h2
            className="text-sm font-semibold "
          >
            Profile
          </h2>
        </div>
      </header>
      <div
        className="relative border-1 border-fg4 h-full pt-0 p-5  flex flex-col items-center justify-around"
      >
        <div className="flex flex-col items-center -mb-18">
          <Avatar
            className="size-[130px] border-1 border-bg3! shadow-md"
          >
            <AvatarImage
              src={user.imgUrl} />
          </Avatar>

        </div>
        <FieldGroup
          className="w-[60%] mx-auto flex flex-col items-center  
          *:px-[10%] [&_*]:text-bg2!"
        >
          <Field orientation="horizontal">
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@your_username"
            />
          </Field>
        </FieldGroup>
        <div
          className=" *:text-sm *:text-bg3 *:underline *:decoration-[0.1em] flex flex-col gap-2 items-center"
        >
          <Button
            onClick={handleLogout}
            className="py-4 font-light text-bg1!
          hover:bg-red decoration-transparent">
            <DoorOpen />
            Logout
          </Button>
        </div>
        <footer className="absolute bottom-3">
          <Signature />
        </footer>
      </div>
    </div>
  )
}
