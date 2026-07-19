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
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
  gender,
  label,
  placeholder,
  setGender,
}) => {
  return (
    <div className="flex-1">
      {" "}
      <label className="text-field-foreground/60 text-sm font-normal">
        {label}
        {setGender ? (
          <div className="flex items-center gap-2 rounded-full mt-0.5 bg-field px-3">
            {gender === "male" ? (
              <Mars color="#707070" width={22} className="shrink-0" />
            ) : gender === "female" ? (
              <Venus color="#707070" width={22} className="shrink-0" />
            ) : (
              <UserCog color="#707070" width={22} className="shrink-0" />
            )}
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full border-0 shadow-none px-0 h-9 bg-transparent font-bold text-sm text-field-foreground">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full mt-0.5 bg-field px-3">
            <Select>
              <SelectTrigger className="w-full shadow-none px-0 h-9 bg-transparent font-bold text-sm text-field-foreground">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 91 }, (_, i) => i + 10).map((age) => (
                    <SelectItem key={age} value={String(age)}>
                      {age} y.o.
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </label>
    </div>
  );
};

export default SelectField;
