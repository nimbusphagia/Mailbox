import type { ContactType } from "@/lib/schemas/contact.schema";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Ban, Image, Package, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UuidType } from "@/lib/schemas/util.schema";
import { ChatInfoLayout } from "@/layouts/ChatInfoLayout";
import { UserThumbnail } from "@/components/UserThumbnail";
import { AsciiRandom } from "@/components/AsciiRandom";

type Props = {
  contact: ContactType | null,
  images: string[],
  isArchived: boolean,
  archiveFn: () => void,
  blockFn: (contactId: UuidType) => void,
  hideFn: () => void,
  nicknameFn: (id: UuidType, nickname: string | null) => void,
}
export function ContactPage({ contact, images, isArchived, blockFn, archiveFn, hideFn, nicknameFn }: Props) {
  const title: string = contact?.nickname ?? contact?.user?.name ?? "User";
  const [nickname, setNickname] = useState<string | null>(contact!.nickname);
  const [showMedia, setShowMedia] = useState<boolean>(false);

  function ContactLabel() {
    return (
      <UserThumbnail
        imgUrl={contact!.user?.imgUrl ?? ""}
        fullName={title}
        className="gap-2!"
        textClassName="text-bg2! text-sm"
        avatarClassname="size-[1.8em] "
      />

    )
  }
  return (
    <ChatInfoLayout
      label={ContactLabel()}
      backFn={hideFn}
    >
      <div className="flex flex-col gap-5 items-center p-3 ">
        <Avatar className="size-fit">
          <AvatarImage
            src={contact?.user?.imgUrl}
            className="h-23 bg-fg0/10 border-1 border-fg3 shadow-sm"
          />
        </Avatar>
        <div className="h-25 max-w-[100%] font-bold flex flex-col gap-2 py-2 items-center">
          <AsciiRandom
            text={title}
            className="text-bg0!"
          />
          <p
            className="font-medium self-center text-xs text-bg2/75 "
          >{"@" + contact?.user?.username}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-3 py-3 [&_*]:text-bg2 [&_*]:text-sm">
        <div className="flex justify-between">
          <label className="font-medium flex items-center gap-1">
            <User className="size-[1rem]" />
            Name
          </label>
          <p
            className="text-center min-w-[25%] w-fit"
          >
            {contact?.user?.name}
          </p>
        </div>

        <div className="flex justify-between">
          <label
            className="font-medium flex items-center gap-1"
            htmlFor="nickname"
          >
            <Star className="size-[1rem]" />
            Nickname
          </label>
          <input
            name="nickname"
            id="nickname"
            placeholder="Insert a nickname"
            maxLength={12}
            value={nickname ?? ""}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => { if (contact && nickname && (nickname.trim() !== contact.nickname)) { nicknameFn(contact.id, nickname.trim()) } }}
            className="bg-fg2/30 text-center min-w-[25%] flex-0 rounded-sm p-0.5"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="font-medium flex items-center gap-2">
              <Image className="size-[1rem]" />
              Files
            </label>
            <Button
              className="flex items-center gap-1 p-2! text-sm! w-[25%] rounded-sm"
              onClick={() => setShowMedia(!showMedia)}
            >
              {showMedia ? "Hide" : "Show"}
            </Button>
          </div>

          {
            showMedia &&
            <div className="grid grid-cols-4 w-full gap-2.5 p-2! bg-fg1 border-1 border-fg2 rounded-sm">
              {images.map(url =>
                <div
                  key={url}
                  className="size-full border-1 border-fg3 rounded-xs overflow-hidden">
                  <img
                    src={url}
                    className="object-center size-full"
                  />
                </div>
              )}
            </div>
          }
        </div>
      </div>
      <div className="flex p-3 mt-auto justify-between text-sm *:bg-transparent *:text-bg2 *:px-3 *:hover:bg-fg2/70 *:rounded-sm!">
        <Button
          className="font-medium hover:text-orange/90! px-4!"
          onClick={archiveFn}
        >
          <Package />
          {isArchived ? "Unarchive" : "Archive"}
        </Button>
        <Button
          className="font-medium hover:text-red! px-4!"
          disabled={!contact}
          onClick={() => contact ? blockFn(contact.id) : null}
        >
          <Ban />
          {contact?.isBlocked ? "Unblock" : "Block"}
        </Button>
      </div>

    </ChatInfoLayout >
  )

}

