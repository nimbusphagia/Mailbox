import type { ContactType } from "@/lib/schemas/contact.schema";
import { useFiglet } from "../Hooks/useFiglet";
import { trimSentence } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Ban, ChevronDown, Image, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UuidType } from "@/lib/schemas/util.schema";

type Props = {
  contact: ContactType | null,
  hideFn: () => void,
  nicknameFn: (id: UuidType, nickname: string) => void,
}
export function ContactPage({ contact, hideFn, nicknameFn }: Props) {
  const title: string = contact?.nickname ?? contact?.user?.name ?? "User";
  const { ascii, loading } = useFiglet(trimSentence(title, 2), { font: "BlurVision ASCII" });
  const [nickname, setNickname] = useState<string | null>(contact!.nickname);
  return (
    <div className="relative size-full flex flex-col gap-3 items-center p-8 py-4 bg-fg2/80 ">
      <Button
        className="cursor-pointer text-bg1 absolute inset-3 inset-y-4 size-[1.2em] p-2"
        onClick={hideFn}
      >
        <ChevronDown
        />
      </Button>
      <div className="w-[68%] *:w-full *:border-b-2 *:border-fg4">
        <div className="h-fit flex flex-col gap-5 items-center p-6 pb-3 ">
          <Avatar className="size-fit">
            <AvatarImage
              src={contact?.user?.imgUrl}
              className="size-35"
            />
          </Avatar>
          <div className="text-center font-bold flex flex-col">
            <pre className="select-none text-[0.4em] text-bg0 font-black leading-none">
              {loading ? title : ascii}
            </pre>
            <p className="font-bold text-sm text-bg1">{"@" + contact?.user?.username}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-3 py-5 *:gap-5">
          <div className="flex justify-between text-sm *:text-bg2 *:p-1">
            <label className="font-bold">Full name</label>
            <p
              className="text-center min-w-[30%] w-fit"
            >
              {contact?.user?.name}
            </p>
          </div>

          <div className="flex justify-between text-sm *:text-bg2  *:p-1">
            <label
              className="font-bold"
              htmlFor="nickname"
            >Nickname</label>
            <input
              name="nickname"
              id="nickname"
              placeholder="Insert a nickname"
              value={nickname ?? ""}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={() => { if (contact && nickname) { nicknameFn(contact.id, nickname) } }}
              className="bg-fg2/30 text-center min-w-[30%] flex-0"
            />
          </div>
          <div className="flex  justify-between text-sm *:text-bg2 *:p-1">
            <Button className="font-bold ">
              <Image />
              Media and files
            </Button>
          </div>
        </div>
        <div className="flex p-3 justify-between text-sm *:p-1">
          <Button className="font-bold text-orange/93">
            <Package />
            Archive
          </Button>
          <Button className="font-bold text-red">
            <Ban />
            Block
          </Button>
        </div>

      </div >
    </div>
  )

}

