import { useState } from "react";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { ProfilePicture } from "@/lib/schemas/assets.schema";

export function useProfilePictureEditor(
  profilePictures: ProfilePicture[],
  defaultUrl?: string,
) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<ProfilePicture | null>(
    defaultUrl ? null : profilePictures[0],
  );
  const { image, setImage, preview, setPreviewUrl, inputRef } =
    useImagePreview();
  const defaultImage = profilePictures[0];

  const resetUrl = defaultUrl ?? defaultImage.url;
  const resetAsset = defaultUrl ? null : defaultImage;

  const togglePicker = () => setShowPicker((p) => !p);

  const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedAsset(null);
    setImage(file);
  };

  const onAssetPicked = (img: ProfilePicture) => {
    setSelectedAsset(img);
    setPreviewUrl(img.url);
  };

  const onDelete = () => {
    setPreviewUrl(resetUrl);
    setSelectedAsset(resetAsset);
    setImage(null);
  };

  const openFilePicker = () => inputRef.current?.click();

  return {
    showPicker,
    togglePicker,
    inputRef,
    imgUrl: preview ?? resetUrl,
    image,
    selectedAsset,
    onFileSelected,
    onAssetPicked,
    onDelete,
    openFilePicker,
  };
}
