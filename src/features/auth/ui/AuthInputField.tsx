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
        className={cn(
          "pt-4.5 pb-4 pl-4 bg-white/90 text-gray-800 placeholder:text-gray-500 shadow-sm",
          error && "border border-red-500",
        )}
      />
      {error && (
        <p className="text-destructive text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
}

export default AuthInputField;
