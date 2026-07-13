import React from "react";

import { Button } from "@/shared/components/ui/button";

interface Props {
  disabled: boolean;
  children: React.ReactNode;
}

function AuthSubmitButton({ disabled, children }: Props) {
  return (
    <div className="text-center">
      <Button variant={"secondary"} size={"lg"} disabled={disabled} type="submit">
        {children}
      </Button>
    </div>
  );
}

export default AuthSubmitButton;
