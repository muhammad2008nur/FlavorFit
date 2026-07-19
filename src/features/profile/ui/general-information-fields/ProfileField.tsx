import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";

import { Input } from "@/shared/components/ui/input";

interface ProfileFieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  type: string;
}

const ProfileField: FunctionComponent<ProfileFieldProps> = ({
  Icon,
  label,
  placeholder,
  type,
}) => {
  return (
    <label className="text-field-foreground/60 text-sm font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5">
        <Icon color="#707070" width={22} />
        <Input
          type={type}
          placeholder={placeholder}
          className="w-full focus-visible:ring-0"
        ></Input>
      </div>
    </label>
  );
};

export default ProfileField;
