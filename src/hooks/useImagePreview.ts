import { useEffect, useRef, useState } from "react";
import type { ValidImage } from "@/lib/schemas/util.schema";

export function useImagePreview() {
  const [image, setImage] = useState<ValidImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const reset = () => {
    setImage(null);
    setPreview(null);
  };

  return { image, setImage, preview, inputRef, reset };
}
