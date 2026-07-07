import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants";
import { Metadata } from "next";

import { VerifyEmail } from "@/features/auth/ui/VerifyEmail";

export const metadata: Metadata = {
  title: "reset-password",
  ...NO_INDEX_PAGE,
};
function page() {
  return <VerifyEmail />;
}

export default page;
