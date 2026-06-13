import type { ChatRes } from "@/lib/schemas/chat.schema";
import type { GroupRes } from "@/lib/schemas/group.schema";
import type { Message, MessageCreate } from "@/lib/schemas/message.schema";
import type { ValidImage } from "@/lib/schemas/util.schema";
import { useEffect, useRef, useState } from "react";

type ReplyState = { message: Message; userName: string };

export function useMessageSubmit(
  chat: ChatRes | GroupRes,
  sendFn: (message: MessageCreate, image?: ValidImage) => void,
) {
  const [textValue, setTextValue] = useState("");
  const [image, setImage] = useState<ValidImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [replying, setReplying] = useState<ReplyState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const submitText = () => {
    if (!textValue?.length) return;
    sendFn({
      chatId: chat.id,
      type: "TEXT",
      content: textValue,
      replyToId: replying?.message.id,
    });
    setTextValue("");
    setReplying(null);
  };

  const submitImage = () => {
    if (!image) return;
    sendFn(
      {
        chatId: chat.id,
        type: "IMAGE",
        content: textValue,
        replyToId: replying?.message.id,
      },
      image,
    );
    setTextValue("");
    setImage(null);
    setReplying(null);
  };

  const submitMessage = () => (image ? submitImage() : submitText());

  return {
    textValue,
    setTextValue,
    image,
    setImage,
    preview,
    replying,
    setReplying,
    fileInputRef,
    submitMessage,
    submitText,
  };
}
