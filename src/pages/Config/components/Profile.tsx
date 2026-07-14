import type { SafeUser } from "@/lib/schemas/user.schema"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KeyRound, UserRoundPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { useProfilePictureEditor } from "@/hooks/useProfilePictureEditor"
import type { ProfilePicture } from "@/lib/schemas/assets.schema"
import { ProfilePictureComponent } from "@/components/ProfilePicture"
import { PicturePicker } from "@/components/PicturePicker"
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema"
import { PasswordChangeForm } from "./PasswordChangeForm"
import type { PasswordChange } from "@/lib/schemas/auth.schema"

type Props = {
  user: SafeUser,
  profilePictures: ProfilePicture[],
  onEdit: (user: SafeUser, image?: ValidImage, asset?: ProfilePicture) => void,
  changePasswordFn: (userId: UuidType, passwordData: PasswordChange) => void,
}
export function ProfilePage({ user, profilePictures, onEdit, changePasswordFn }: Props) {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const picture = useProfilePictureEditor(profilePictures, user.imgUrl);
  const [showPM, setShowPM] = useState<boolean>(false);
  const pmRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showPM) {
      pmRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showPM]);

  function cancelPictureChange() {
    picture.onDelete();
    picture.togglePicker();
  }
  const submitEdit = () => {
    if (username.trim() === "" || name.trim() === "") return;
    const data: SafeUser = { ...user, username, name, };

    if (picture.image) {
      onEdit(data, picture.image);
    } else if (picture.selectedAsset) {
      onEdit(data, undefined, picture.selectedAsset);
    } else {
      onEdit(data);
    }
  };
  const submitPasswordChange = (passwordData: PasswordChange) => {
    changePasswordFn(user.id, passwordData);
    setShowPM(false);
  }

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
                  onClick={() => {
                    picture.togglePicker();
                    submitEdit();
                  }}
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
              maxLength={20}
              value={name}
              onChange={(e) => {
                if (e.target.value.trim() !== "") {
                  setName(e.target.value)
                }
              }}
              onBlur={(name !== user.name) ? submitEdit : () => setName(user.name)}
            />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              minLength={3}
              maxLength={16}
              value={username}
              onChange={(e) => {
                if (e.target.value.trim() !== "") {
                  setUsername(e.target.value.trim())
                }
              }}
              onBlur={(username !== user.username) ? submitEdit : () => setUsername(user.username)}
              placeholder="@your_username"
            />
          </Field>
        </FieldGroup>
        <div className="w-full flex items-center justify-center">
          {showPM ?
            <PasswordChangeForm
              onSubmit={submitPasswordChange}
              hideFn={() => setShowPM(false)}
              ref={pmRef}
            /> :
            <Button
              className="text-bg3 font-normal text-[13px] gap-3 border-fg4 rounded-sm"
              onClick={() => setShowPM(true)}
            >
              Change password
              <KeyRound strokeWidth={1.3} />
            </Button>
          }
        </div>
      </main>
    </div>
  )
}
