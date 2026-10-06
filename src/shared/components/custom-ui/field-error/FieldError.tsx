import { FunctionComponent } from "react";

import { cn } from "@/shared/utils";

interface FieldErrorProps {
  message?: string;
  className?: string;
}

const FieldError: FunctionComponent<FieldErrorProps> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={cn(
        "text-destructive text-xs font-normal mt-1 px-3",
        className,
      )}
    >
      {message}
    </p>
  );
};

export default FieldError;
