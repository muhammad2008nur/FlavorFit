import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants";
import { Metadata } from "next";

import { ResetPassword } from "@/features/auth/ui/ResetPassword";

export const metadata: Metadata = {
  title: "reset-password",
  ...NO_INDEX_PAGE,
};
function page() {
  return <ResetPassword />;
}

export default page;
