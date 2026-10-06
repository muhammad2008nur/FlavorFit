import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  ActivityLevel,
  NutritionGoal,
} from "@/shared/api/__generated__/graphql";
import { ProfileFormInput } from "@/features/profile/profile-schema.zod";
import FieldError from "@/shared/components/custom-ui/field-error/FieldError";


interface Category {
  value: NutritionGoal | ActivityLevel;
  label: string;
}

interface LevelsFieldProps {
  label: string;
  Icon: LucideIcon;
  placeholder: string;
  type: Array<Category>;
  formName: "nutritionGoal" | "activityLevel";
  isEditing: boolean

}

const LevelsField: FunctionComponent<LevelsFieldProps> = ({
  label,
  Icon,
  placeholder,
  type,
  formName,
  isEditing
}) => {
  const { control, formState: { errors } } = useFormContext<ProfileFormInput>()
  const error = errors[formName];

  return (
    <div className="pt-5">
      {label}
      <Controller
        name={formName}
        control={control}
        render={({ field }) => {
          const selected = field.value == null ? "" : String(field.value);

          return (
            <div className="flex items-center mt-1.5 gap-3 rounded-full px-3 bg-field font-normal text-sm placeholder:text-sm placeholder:font-light">
              <Icon />

              <Select
                disabled={!isEditing}
                value={selected}
                onValueChange={(value) => value && field.onChange(value)}
              >
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
      <FieldError message={error?.message} />
    </div>
  );
};

export default LevelsField;
