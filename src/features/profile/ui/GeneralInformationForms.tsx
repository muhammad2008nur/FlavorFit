"use client";

import { Mail, UserRound } from "lucide-react";
import { useState } from "react";

import AvatarUpload from "./general-information-fields/AvatarUpload";
import ProfileField from "./general-information-fields/ProfileField";
import ProfileLinks from "./general-information-fields/ProfileLinks";
import SelectField from "./general-information-fields/SelectField";
import TextArea from "./general-information-fields/Textarea";

interface GeneralInformationProps {
  avatarUrl?: string | null;
  onAvatarUpload: () => void;
}

const GeneralInformation = ({
  avatarUrl,
  onAvatarUpload,
}: GeneralInformationProps) => {
  const [gender, setGender] = useState("");
  const urls = [
    "https://example.com",
    "https://example.org",
    "https://example.net",
  ];
  const AgeArray = Array.from({ length: 91 }, (_, i) => ({
    value: String(i + 10),
    label: `${i + 10} y.o.`,
  }));
  const GenderArray = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  return (
    <div className="bg-secondary ">
      <div>
        <h1>General information</h1>
        <div className="flex gap-1 items-start mt-2.5">
          <AvatarUpload avatarUrl={avatarUrl} onAvatarUpload={onAvatarUpload} />
          <div className="w-full">
            <ProfileField
              Icon={UserRound}
              label={"Full name"}
              placeholder={"Ivanov Ivan"}
              type={"text"}
            />{" "}
          </div>
        </div>
        <div className="pt-2">
          <ProfileField
            Icon={Mail}
            label={"Email"}
            placeholder={"example@gmail.com"}
            type={"text"}
          />{" "}
        </div>
        <div className="flex gap-3 pt-2.5">
          <SelectField
            label={"Gender"}
            placeholder={"Choose your gender"}
            gender={gender}
            setGender={setGender}
            type={GenderArray}
          />
          <SelectField
            type={AgeArray}
            label={"Age"}
            placeholder={"Choose your age"}
          />
        </div>
      </div>
      <TextArea label="Bio" />
      <ProfileLinks urls={urls} />
    </div>
  );
};

export default GeneralInformation;
