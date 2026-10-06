import { FunctionComponent } from "react";

import { Textarea } from "@/shared/components/ui/textarea";
import FieldError from "@/shared/components/custom-ui/field-error/FieldError";


interface TextAreaProps {
  label: string;
  formName: "bio";
  isEditing: boolean;
}
import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "@/features/profile/profile-schema.zod";
const TextArea: FunctionComponent<TextAreaProps> = ({
  label,
  formName,
  isEditing,
}) => {
  const { register, formState: { errors } } = useFormContext<ProfileFormInput>()
  const error = errors[formName];

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
        <FieldError message={error?.message} />
      </label>
    </div>
  );
};

export default TextArea;
