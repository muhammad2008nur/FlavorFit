import { CircleAlert, RotateCw } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface ProfileErrorProps {
  message?: string;
  onRetry: () => void;
}

const ProfileError = ({ message, onRetry }: ProfileErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-4xl outline-background outline-2 px-4 py-16 mt-5 text-center">
      <CircleAlert size={40} color="#707070" />
      <h2>Failed to load profile</h2>
      <p className="text-field-foreground/60 text-sm font-normal max-w-md">
        {message ?? "Something went wrong. Please try again."}
      </p>
      <Button type="button" variant={"accent"} onClick={onRetry}>
        <RotateCw />
        Try again
      </Button>
    </div>
  );
};

export default ProfileError;
