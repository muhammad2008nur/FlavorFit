import { Mars, UserCog, Venus } from "lucide-react";
import { FunctionComponent } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface SelectFieldProps {
  label: string;
  placeholder: string;
  gender?: string;
  setGender?: (gender: string) => void;
  type: Array<{
    value: string;
    label: string;
  }>;
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
  gender,
  label,
  placeholder,
  setGender,
  type,
}) => {
  return (
    <div className="flex-1">
      {" "}
      <label className="text-field-foreground/60 text-sm font-normal">
        {label}

        <div className="flex items-center gap-2 rounded-full mt-0.5 bg-field px-3">
          {gender === "male" ? (
            <Mars color="#707070" width={22} className="shrink-0" />
          ) : gender === "female" ? (
            <Venus color="#707070" width={22} className="shrink-0" />
          ) : gender === undefined ? (
            ""
          ) : (
            <UserCog color="#707070" width={22} className="shrink-0" />
          )}
          <Select
            value={gender && gender}
            onValueChange={setGender && setGender}
          >
            <SelectTrigger className="w-full border-0 font-medium data-placeholder:font-light shadow-none px-0 h-9 bg-transparent  text-sm text-field-foreground">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {type.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </label>
    </div>
  );
};

export default SelectField;
