import { Mars, UserCog, Venus } from "lucide-react";
import { FunctionComponent } from "react";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import FieldError from "@/shared/components/custom-ui/field-error/FieldError";

import { Gender } from "@/shared/api/__generated__/graphql";

import { ProfileFormInput } from "@/features/profile/profile-schema.zod";
import {
  useFormContext

} from "react-hook-form";
interface SelectFieldProps {
  label: string;
  placeholder: string;
  ageArray: Array<{
    value: string;
    label: string;
  }>;
  isEditing: boolean;
  formName: "gender" | "age";
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
  label,
  placeholder,
  ageArray,
  isEditing,
  formName,
}) => {
  const { control, formState: { errors } } = useFormContext<ProfileFormInput>()
  const error = errors[formName];

  return (
    <div className="flex-1">
      {" "}
      <label className="text-field-foreground/60 text-sm font-normal">
        {label}

        <div className="flex items-center gap-2 rounded-full mt-0.5 bg-field px-3">
          <Controller
            name={formName}
            control={control}
            render={({ field }) => {
              const selected = field.value == null ? "" : String(field.value);

              return (
                <>
                  {formName === "gender" &&
                    (selected === Gender.Male ? (
                      <Mars color="#707070" width={22} className="shrink-0" />
                    ) : selected === Gender.Female ? (
                      <Venus color="#707070" width={22} className="shrink-0" />
                    ) : (
                      <UserCog
                        color="#707070"
                        width={22}
                        className="shrink-0"
                      />
                    ))}
                  <Select
                    value={selected}
                    onValueChange={(value) => value && field.onChange(value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full border-0 font-medium data-placeholder:font-light shadow-none px-0 h-9 bg-transparent  text-sm text-field-foreground">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ageArray.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              );
            }}
          />
        </div>
        <FieldError message={error?.message} />
      </label>
    </div>
  );
};

export default SelectField;
