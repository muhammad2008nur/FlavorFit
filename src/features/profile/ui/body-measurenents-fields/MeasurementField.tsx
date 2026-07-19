import { LucideIcon } from "lucide-react";
import { FunctionComponent } from "react";

import { Input } from "@/shared/components/ui/input";

interface MeasurementFieldProps {
  label: string;
  Icon: LucideIcon;
  metric: string;
}

const MeasurementField: FunctionComponent<MeasurementFieldProps> = ({
  label,
  Icon,
  metric,
}) => {
  return (
    <label className="text-field-foreground/60 text-[15px] font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5 h-9">
        <Icon color="#707070" width={22} className="shrink-0" />
        <Input
          type={"text"}
          maxLength={3}
          className="w-6 flex-none px-0 focus-visible:ring-0"
        />
        <span className="text-sm text-field-foreground">{metric}</span>
      </div>
    </label>
  );
};
{
  /* <label className="text-field-foreground/60 text-sm font-normal">
      {label}
      <div className="flex items-center gap-2 rounded-full bg-field px-3 mt-0.5">
        <Icon color="#707070" width={22} />
        <Input
          type={type}
          placeholder={placeholder}
          className="w-full focus-visible:ring-0"
        ></Input>
      </div>
    </label> */
}

export default MeasurementField;
