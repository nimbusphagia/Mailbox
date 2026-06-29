import type { SafeUser } from "@/lib/schemas/user.schema"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowLeft, DoorOpen, UserRoundPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Signature } from "@/components/Signature"
import { useState } from "react"
import { useProfilePictureEditor } from "@/hooks/useProfilePictureEditor"
import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import { ProfilePictureComponent } from "@/components/ProfilePicture"
import { PicturePicker } from "@/components/PicturePicker"

type Props = {
  user: SafeUser,
  profilePictures: ProfilePicture[],
  closeFn: () => void,
  handleLogout: () => void,
}
export function ProfilePage({ user, profilePictures, closeFn, handleLogout }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const picture = useProfilePictureEditor(profilePictures, user.imgUrl);

  function cancelPictureChange() {
    picture.onDelete();
    picture.togglePicker();
  }
  function submitCreate() { }

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
        className="relative border-1 border-fg4 h-full pt-12 pb-18 
        bg-fg2/30 flex flex-col items-center justify-between gap-5"
      >
        <div className="w-[35%] flex flex-col gap-2 ">
          <ProfilePictureComponent
            imgUrl={picture.imgUrl}
            fileInputRef={picture.inputRef}
            handlePicker={picture.togglePicker}
            handlePreview={picture.onFileSelected}
            handleDelete={picture.onDelete}
          />
          {picture.showPicker &&
            <>
              <PicturePicker
                pictures={profilePictures}
                onPictureClick={picture.onAssetPicked}
                onCameraClick={picture.openFilePicker}
                cols={6}
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
          className="flex-1 max-h-[50%] w-[60%] mt-0 mx-auto flex flex-col items-center  
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
        <div
          className="*:text-sm *:text-bg3 *:underline *:decoration-[0.1em] flex flex-col gap-2 items-center"
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
