"use client";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";

import "@/shared/api/__generated__/graphql";

interface AvatarUpload {
  avatarUrl?: string | null;
  onAvatarUpload: () => void;
}
function AvatarUpload({ avatarUrl, onAvatarUpload }: AvatarUpload) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/media-upload/avatar`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );
    if (res.ok) onAvatarUpload();
  };
  return (
    <div className="flex items-end mt-1.5 shrink-0">
      {avatarUrl ? (
        <Image
          alt="avatar"
          className="size-15 rounded-full object-cover"
          height={55}
          width={55}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${avatarUrl}`}
        />
      ) : (
        <div className="flex size-13 items-center justify-center rounded-full bg-gray-300 text-sm font-medium">
          А
        </div>
      )}
      <div>
        <input type="file" ref={inputRef} hidden onChange={handleFileChange} />
        <SquarePen
          color="#434242"
          strokeWidth={2.5}
          onClick={() => inputRef?.current?.click()}
          className="relative bg-white rounded-full p-0.75 pb-1 right-3 top-0.75 z-10 hover:scale-110"
          size={23}
        />
      </div>
    </div>
  );
}
export default AvatarUpload;
