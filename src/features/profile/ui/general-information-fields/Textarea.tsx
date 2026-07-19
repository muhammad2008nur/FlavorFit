import { FunctionComponent } from "react";

import { Textarea } from "@/shared/components/ui/textarea";

interface TextAreaProps {
  label: string;
}

const TextArea: FunctionComponent<TextAreaProps> = () => {
  return (
    <div className="py-2">
      <label className="text-sm text-field-foreground/60 font-light">
        Bio
        <div className="bg-field rounded-4xl">
          <Textarea className="text-field-foreground font-bold" />
        </div>
      </label>
    </div>
  );
};

export default TextArea;
