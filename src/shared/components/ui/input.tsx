import { cn } from "@/shared//utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `   h-9 w-full  min-w-0  font-medium 
            rounded-xl border border-input
            px-2.5 py-1  
            transition-[color,box-shadow] outline-none 
            placeholder:font-medium placeholder:text-sm 
            focus-visible:border-ring
            focus-visible:ring-1 focus-visible:ring-ring 
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
            aria-invalid:border-destructive
            aria-invalid:ring-3 aria-invalid:ring-destructive/20
            md:text-sm dark:bg-input/30 
            dark:aria-invalid:border-destructive/50 
            dark:aria-invalid:ring-destructive/40`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
