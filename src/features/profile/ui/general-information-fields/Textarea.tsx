import { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";

import { Textarea } from "@/shared/components/ui/textarea";

import { ProfileData } from "../../profile.types";

interface TextAreaProps {
  label: string;
  register: UseFormRegister<ProfileData>;
  formName: "bio";
  isEditing: boolean;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  label,
  register,
  formName,
  isEditing,
}) => {
  return (
    <div className="py-2">
      <label className="text-sm text-field-foreground/60 font-light">
        {label}
        <div className="bg-field rounded-4xl">
          <Textarea
            readOnly={!isEditing}
            {...register(formName, {})}
            className="text-field-foreground font-medium"
          />
        </div>
      </label>
    </div>
  );
};

export default TextArea;
