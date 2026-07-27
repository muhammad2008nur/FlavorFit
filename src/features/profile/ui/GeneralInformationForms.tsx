"use client";

import { Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Control, UseFormRegister } from "react-hook-form";

import { ProfileData } from "../profile.types";
import AvatarUpload from "./general-information-fields/AvatarUpload";
import ProfileField from "./general-information-fields/ProfileField";
import ProfileLinks from "./general-information-fields/ProfileLinks";
import SelectField from "./general-information-fields/SelectField";
import TextArea from "./general-information-fields/Textarea";

interface GeneralInformationProps {
  avatarUrl?: string | null;
  onAvatarUpload: () => void;
  register: UseFormRegister<ProfileData>;
  isEditing: boolean;
  formName: {
    email: "email";
    fullName: "fullName";
    age: "age";
    gender: "gender";
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ProfileData, any, ProfileData>;
}

const GeneralInformation = ({
  avatarUrl,
  onAvatarUpload,
  register,
  isEditing,
  formName,
  control,
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
              formName={formName.fullName}
              isEditing={isEditing}
              register={register}
              Icon={UserRound}
              label={"Full name"}
              placeholder={"Ivanov Ivan"}
              type={"text"}
            />{" "}
          </div>
        </div>
        <div className="pt-2">
          <ProfileField
            formName={formName.email}
            isEditing={isEditing}
            register={register}
            Icon={Mail}
            label={"Email"}
            placeholder={"example@gmail.com"}
            type={"text"}
          />{" "}
        </div>
        <div className="flex gap-3 pt-2.5">
          <SelectField
            control={control}
            register={register}
            isEditing={isEditing}
            formName={formName.gender}
            label={"Gender"}
            placeholder={"Choose your gender"}
            gender={gender}
            setGender={setGender}
            type={GenderArray}
          />
          <SelectField
            control={control}
            register={register}
            formName={formName.age}
            type={AgeArray}
            label={"Age"}
            placeholder={"Choose your age"}
            isEditing={isEditing}
          />
        </div>
      </div>
      <TextArea label="Bio" />
      <ProfileLinks urls={urls} />
    </div>
  );
};

export default GeneralInformation;
