import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";

import { Input } from "@/shared/components/ui/input";
import FieldError from "@/shared/components/custom-ui/field-error/FieldError";

import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "@/features/profile/profile-schema.zod";
export interface ProfileFieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  isEditing: boolean;
  formName: "email" | "fullName";
}

const ProfileField: FunctionComponent<ProfileFieldProps> = ({
  Icon,
  label,
  placeholder,
  isEditing,
  formName,
}) => {
  const { register, formState: { errors } } = useFormContext<ProfileFormInput>()
  const error = errors[formName];

  return (
    <label className="text-field-foreground/60 text-sm font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5">
        <Icon color="#707070" width={22} />
        <Input
          {...register(formName, {})}
          readOnly={!isEditing}
          placeholder={placeholder}
          className="w-full focus-visible:ring-0"
          type="text"
        />
      </div>
      <FieldError message={error?.message} />
    </label>
  );
};

export default ProfileField;
