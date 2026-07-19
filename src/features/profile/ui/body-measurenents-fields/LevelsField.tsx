import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface LevelsFieldProps {
  label: string;
  Icon: LucideIcon;
  placeholder: string;
}

const LevelsField: FunctionComponent<LevelsFieldProps> = ({
  label,
  Icon,
  placeholder,
}) => {
  return (
    <div className="pt-5">
      {label}
      <div className="flex items-center mt-1.5 gap-3 rounded-full px-3 bg-field font-normal text-sm placeholder:text-sm placeholder:font-light">
        <Icon />
        <Select>
          <SelectTrigger className="w-full border-0 shadow-none px-0 h-9  bg-transparent  text-sm text-field-foreground">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male"></SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LevelsField;
