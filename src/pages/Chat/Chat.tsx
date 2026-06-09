import { Messages } from "@/components/Messages"
import { Button } from "@/components/ui/button"
import { UserThumbnail } from "@/components/UserThumbnail"
import type { ChatRes } from "@/lib/schemas/chat.schema"
import type { GroupRes } from "@/lib/schemas/group.schema"
import type { Message, MessageCreate } from "@/lib/schemas/message.schema"
import type { UuidType, ValidImage } from "@/lib/schemas/util.schema"
import { ChevronDown, Image, Mailbox } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  chat: ChatRes | GroupRes,
  sendFn: (message: MessageCreate, image?: ValidImage) => void,
  getContact: (userId: UuidType) => void,
  showInfo: () => void,
}
export function Chat({ chat, sendFn, getContact, showInfo }: Props) {
  const [textValue, setTextValue] = useState<string>("");
  const focusRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<ValidImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [replying, setReplying] = useState<{ message: Message, userName: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isGroup = (chat: ChatRes | GroupRes): chat is GroupRes => chat.isGroup === true;
  const groupChat = isGroup(chat) ? chat : null;
  const directChat = isGroup(chat) ? null : chat;

  useEffect(() => {
    setReplying(null);
    focusRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    focusRef.current?.focus();
  }, [chat]);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const submitText = () => {
    if (textValue?.length) {
      const message = {
        chatId: chat.id,
        type: "TEXT" as const,
        content: textValue,
        replyToId: replying?.message.id,
      };
      sendFn(message);
      setTextValue("");
    }
  }
  const submitImage = () => {
    if (image) {
      const message = {
        chatId: chat.id,
        type: "IMAGE" as const,
        content: textValue,
        replyToId: replying?.message.id,
      };
      sendFn(message, image);
      setTextValue("");
      setImage(null);
    }
  }
  const submitMessage = () => {
    image ? submitImage() : submitText();
  }

  return (
    <main className="relative box-border flex-1 min-h-0 bg-fg4 size-full grid grid-rows-[8%_1fr_auto] text-bg1">
      <div className="bg-fg1/65 flex items-center justify-between size-full px-3">
        <UserThumbnail
          imgUrl={groupChat ? groupChat.imgUrl : directChat!.secondaryMember?.imgUrl}
          fullName={groupChat ? groupChat.name : directChat!.secondaryMember.nickname ?? directChat!.secondaryMember.name}
          showFn={() => {
            if (groupChat) {
              showInfo();
            } else {
              getContact(directChat!.secondaryMember.id)
              showInfo()
            }
          }
          }
        />
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll">
        <Messages
          isGroup={isGroup(chat)}
          title={groupChat?.name}
          imgUrl={groupChat?.imgUrl}
          messages={chat.messages}
          primary={chat.primaryMember}
          secondary={directChat?.secondaryMember ?? null}
          secondaryMembers={groupChat?.secondaryMembers ?? []}
          createdAt={chat.createdAt}
          focusRef={focusRef}
          replyFn={(message: Message, userName: string) => setReplying({ message, userName })}
        />
      </div>
      <div className="flex flex-col m-3 mt-1 gap-2 flex-1 p-0 bg-bg3/20 rounded-sm shadow-xs shadow-fg4"  >
        {preview && (
          <div className="relative bg-fg3 w-full rounded-t-sm">
            <Button
              className="absolute top-1 right-1 text-bg3 hover:text-bg2"
              onClick={() => setImage(null)}
            >
              <ChevronDown />
            </Button>
            <div className="max-w-[30%] max-h-full p-2 m-auto ">
              <img
                src={preview}
                alt="Preview"
                className="max-h-full"
              />
            </div>
          </div>
        )}
        {replying && (
          <div className="relative bg-fg3 w-full rounded-t-sm">
            <div className="max-size-full p-2">
              <Button
                className="absolute top-1 right-1 text-bg3 hover:text-bg2"
                onClick={() => setReplying(null)}
              >
                <ChevronDown />
              </Button>
              <div className="bg-fg2 p-[0.5em] max-w-full max-h-[100px] flex justify-between">
                <div className="border-l-2 border-bg3 pl-1.5 flex flex-col gap-0.5">
                  <p
                    className="font-bold text-sm"
                  >{replying.userName}
                  </p>
                  <p
                    className="text-xs font-semibold"
                  >{replying.message.content?.trim() ? replying.message.content : "Photo"}
                  </p>
                </div>

                {replying.message.type === "IMAGE" &&
                  <div className="max-w-[180px] max-h-[150px]">
                    <img
                      src={replying.message.metadata?.url}
                      alt="Preview"
                      className="max-h-full"
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col m-2 gap-2 flex-1 p-0"  >
          <div className="flex items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;
                setImage(file);
              }}
            />

            <Button
              className=" text-md text-bg2 w-fit flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="w-[1.2em]" />
            </Button>
            <input
              className="p-1 px-3 text-sm font-bold w-full outline-none text-bg1
          focus:bg-fg3/70 focus:placeholder:text-bg2 focus:text-bg1 rounded-xs"
              placeholder=":message"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitText();
                }
              }}
            />

            <Button
              className=" text-md text-bg2"
              disabled={!(image || textValue.length)}
              onClick={submitMessage}
            >
              <Mailbox className="text-bg0 size-md" />
            </Button>
          </div>
        </div>
      </div>
    </main >
  )
}
