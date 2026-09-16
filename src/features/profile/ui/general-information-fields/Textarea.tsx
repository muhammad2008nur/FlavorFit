import { FunctionComponent } from "react";

import { Textarea } from "@/shared/components/ui/textarea";


interface TextAreaProps {
  label: string;
  // register: UseFormRegister<ProfileData>;
  formName: "bio";
  isEditing: boolean;
}
import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "../../profile-schema.zod";
const TextArea: FunctionComponent<TextAreaProps> = ({
  label,
  // register,
  formName,
  isEditing,
}) => {
  const { register } = useFormContext<ProfileFormInput>()
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
