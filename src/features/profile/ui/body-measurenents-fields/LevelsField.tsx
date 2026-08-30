import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { Control, Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { ProfileData } from "../../profile.types";

interface Category {
  value: string;
  label: string;
}

interface LevelsFieldProps {
  label: string;
  Icon: LucideIcon;
  placeholder: string;
  type: Array<Category>;
  formName: "nutritionGoal" | "activityLevel";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ProfileData, any, ProfileData>;
}

const LevelsField: FunctionComponent<LevelsFieldProps> = ({
  label,
  Icon,
  placeholder,
  type,
  formName,
  control,
}) => {
  return (
    <div className="pt-5">
      {label}
      <Controller
        name={formName}
        control={control}
        render={({ field }) => {
          const selected =
            field.value == null ? undefined : String(field.value);

          return (
            <div className="flex items-center mt-1.5 gap-3 rounded-full px-3 bg-field font-normal text-sm placeholder:text-sm placeholder:font-light">
              <Icon />

              <Select value={selected} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border-0 shadow-none px-0 h-9 font-medium bg-transparent  text-sm text-field-foreground">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {type.map((item) => {
                      return (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      );
                    })}{" "}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LevelsField;
