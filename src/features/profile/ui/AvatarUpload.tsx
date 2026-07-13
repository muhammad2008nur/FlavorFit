"use client";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";

import { AvatarFallback } from "@/shared/components/ui/avatar";

import "@/shared/api/__generated__/graphql";

interface AvatarUpload {
  avatarUrl?: string;
}
function AvatarUpload({ avatarUrl }: AvatarUpload) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/media-upload/avatar`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  };
  return (
    <div className="flex items-end mt-1.5">
      {avatarUrl ? (
        <Image
          alt="avatar"
          className="absolute rounded-full"
          width={40}
          height={40}
          src={avatarUrl}
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
