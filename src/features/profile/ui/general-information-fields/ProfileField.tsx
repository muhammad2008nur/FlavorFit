import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";

import { ProfileData } from "../../profile.types";

export interface ProfileFieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<ProfileData>;
  isEditing: boolean;
  formName: "email" | "fullName";
}

const ProfileField: FunctionComponent<ProfileFieldProps> = ({
  Icon,
  label,
  placeholder,
  type,
  register,
  isEditing,
  formName,
}) => {
  return (
    <label className="text-field-foreground/60 text-sm font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5">
        <Icon color="#707070" width={22} />
        <Input
          {...register(formName, {})}
          readOnly={!isEditing}
          type={type}
          placeholder={placeholder}
          className="w-full focus-visible:ring-0 "
        />
      </div>
    </label>
  );
};

export default ProfileField;
