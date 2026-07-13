import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/shared/utils";

import { Input } from "@/shared/components/ui/input";

interface Props {
  type: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

function AuthInputField({ type, placeholder, registration, error }: Props) {
  return (
    <div>
      <Input
        {...registration}
        type={type}
        placeholder={placeholder}
        className={cn("pt-4.5 pb-4 pl-3 ", error && "border-red-500")}
      />
      {error && (
        <p className="text-destructive text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
}

export default AuthInputField;
