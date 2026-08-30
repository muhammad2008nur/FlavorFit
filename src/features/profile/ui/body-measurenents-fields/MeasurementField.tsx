import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";

import { ProfileData } from "../../profile.types";

interface MeasurementFieldProps {
  label: string;
  Icon: LucideIcon;
  metric: string;
  register: UseFormRegister<ProfileData>;
  formName:
    | "growth"
    | "currentWeight"
    | "desiredWeight"
    | "waist"
    | "chest"
    | "thigh"
    | "arm";
  isEditing: boolean;
}

const MeasurementField: FunctionComponent<MeasurementFieldProps> = ({
  label,
  Icon,
  metric,
  register,
  formName,
  isEditing,
}) => {
  return (
    <label className="text-field-foreground/60 text-[15px] font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5 h-9">
        <Icon color="#707070" width={22} className="shrink-0" />
        <Input
          {...register(formName, { valueAsNumber: true })}
          readOnly={!isEditing}
          type={"text"}
          maxLength={3}
          className="w-6 flex-none px-0 focus-visible:ring-0"
        />
        <span className="text-sm text-field-foreground">{metric}</span>
      </div>
    </label>
  );
};

export default MeasurementField;
