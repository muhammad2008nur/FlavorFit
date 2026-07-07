import type { Metadata } from "next";

import { ResetPasswordRequest } from "@/features/auth/ui/ResetPasswordRequest";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "reset-password",
  ...NO_INDEX_PAGE,
};
export default function Page() {
  return (
    <div>
      <ResetPasswordRequest />
    </div>
  );
}
