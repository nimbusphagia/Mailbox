import type { SafeUser } from "@/lib/schemas/user.schema"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KeyRound, UserRoundPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useProfilePictureEditor } from "@/hooks/useProfilePictureEditor"
import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import { ProfilePictureComponent } from "@/components/ProfilePicture"
import { PicturePicker } from "@/components/PicturePicker"

type Props = {
  user: SafeUser,
  profilePictures: ProfilePicture[],
}
export function ProfilePage({ user, profilePictures }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const picture = useProfilePictureEditor(profilePictures, user.imgUrl, true);

  function cancelPictureChange() {
    picture.onDelete();
    picture.togglePicker();
  }
  function submitCreate() { }

  return (
    <div
      className="overflow-hidden m-4 ml-2 rounded-sm flex flex-col 
      gap-4 *:rounded-sm
      ">
      <header
        className="flex items-center gap-2 *:bg-fg2 
      *:rounded-sm *:p-2 *:border-[0.01em] *:border-fg3 *:text-bg1
        ">
        <div className="flex gap-2 items-center">
          <UserRoundPen className="size-[1em]" />
          <h2
            className="text-sm font-semibold "
          >
            Account
          </h2>
        </div>
      </header>
      <main
        className="relative border-1 border-fg4 h-full p-10 
        bg-fg2/30 flex flex-col items-center gap-12 overflow-y-scroll 
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="w-[40%] max-w-[370px] flex flex-col gap-2 ">
          <ProfilePictureComponent
            imgUrl={picture.imgUrl}
            fileInputRef={picture.inputRef}
            handlePicker={picture.togglePicker}
            handlePreview={picture.onFileSelected}
            handleDelete={picture.onDelete}
            actionsClassName="gap-3"
          />
          {picture.showPicker &&
            <>
              <PicturePicker
                pictures={profilePictures}
                onPictureClick={picture.onAssetPicked}
                onCameraClick={picture.openFilePicker}
                cols="grid-cols-6 gap-2.5! p-3.5!"
              />
              <div className="flex justify-between mt-auto *:text-xs *:rounded-sm py-1">
                <Button
                  onClick={cancelPictureChange}
                  className="text-bg3">Cancel</Button>
                <Button
                  onClick={submitCreate}
                  className="text-bg4 border-bg4!">Confirm</Button>
              </div>
            </>
          }

        </div>
        <FieldGroup
          className="w-[60%] mt-0 mx-auto flex flex-col items-center  
          *:px-[10%] [&_*]:text-bg1/80!"
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
        <div >
          <Button className="text-bg3 font-normal text-[13px] gap-3 border-fg4 rounded-sm">
            Change password
            <KeyRound strokeWidth={1.3} />
          </Button>
        </div>
      </main>
    </div>
  )
}
