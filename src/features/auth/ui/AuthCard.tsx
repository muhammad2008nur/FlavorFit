import React from "react";

import AuthImage from "./AuthImage";

interface Props {
  title: string;
  captchaWidget?: React.ReactNode;
  showImage?: boolean;
  children: React.ReactNode;
}

function AuthCard({ title, captchaWidget, showImage = true, children }: Props) {
  return (
    <div className="flex h-screen">
      {captchaWidget}

      <div className="relative bg-linear-to-tr  from-violet-500 to-violet-400 w-sm m-auto text-primary-foreground p-5 shadow-lg rounded-2xl">
        <h1 className="text-center font-roboto font-extrabold text-4xl mb-5 mt-2">
          {title}
        </h1>
        {children}
        {showImage && <AuthImage />}
      </div>
    </div>
  );
}

export default AuthCard;
