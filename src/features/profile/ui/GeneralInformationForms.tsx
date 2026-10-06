"use client";

import { Mail, UserRound } from "lucide-react";


import AvatarUpload from "./general-information-fields/AvatarUpload";
import ProfileField from "./general-information-fields/ProfileField";
import ProfileLinks from "./general-information-fields/ProfileLinks";
import SelectField from "./general-information-fields/SelectField";
import TextArea from "./general-information-fields/Textarea";
import { Gender } from "@/shared/api/__generated__/graphql";

const AgeArray = Array.from({ length: 91 }, (_, i) => ({
  value: String(i + 10),
  label: `${i + 10} y.o.`,
}));

const GenderArray = [
  {
    value: Gender.Male,
    label: "Male",
  },
  {
    value: Gender.Female,
    label: "Female",
  },
];

interface GeneralInformationProps {
  avatarUrl: string | null;
  onAvatarUpload: () => void;
  isEditing: boolean;
}

const GeneralInformation = ({
  avatarUrl,
  onAvatarUpload,
  isEditing,
}: GeneralInformationProps) => {
  return (
    <div className="bg-secondary ">
      <div>
        <h1>General information</h1>
        <div className="flex gap-1 items-start mt-2.5">
          <AvatarUpload avatarUrl={avatarUrl} onAvatarUpload={onAvatarUpload} />
          <div className="w-full">
            <ProfileField
              formName="fullName"
              isEditing={isEditing}
              Icon={UserRound}
              label={"Full name"}
              placeholder={"Ivanov Ivan"}
            />{" "}
          </div>
        </div>
        <div className="pt-2">
          <ProfileField
            formName="email"
            isEditing={isEditing}
            Icon={Mail}
            label={"Email"}
            placeholder={"example@gmail.com"}
          />{" "}
        </div>
        <div className="flex gap-3 pt-2.5">
          <SelectField
            isEditing={isEditing}
            formName="gender"
            label={"Gender"}
            placeholder={"Choose your gender"}
            ageArray={GenderArray}
          />
          <SelectField
            formName="age"
            ageArray={AgeArray}
            label={"Age"}
            placeholder={"Choose your age"}
            isEditing={isEditing}
          />
        </div>
      </div>
      <TextArea
        isEditing={isEditing}
        formName="bio"
        label="Bio"
      />
      <ProfileLinks isEditing={isEditing} />
    </div>
  );
};

export default GeneralInformation;
