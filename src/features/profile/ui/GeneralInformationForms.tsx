"use client";

import { Mail, UserRound } from "lucide-react";
import { Control, UseFormRegister } from "react-hook-form";

import { Gender } from "@/shared/api/__generated__/graphql";

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
    bio: "bio";
    sites: "sites";
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
      <TextArea
        isEditing={isEditing}
        formName={formName.bio}
        register={register}
        label="Bio"
      />
      <ProfileLinks control={control} isEditing={isEditing} />
    </div>
  );
};

export default GeneralInformation;
