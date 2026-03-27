import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { AuthForm } from "../../../features/auth/ui/AuthForm";
export const metadata: Metadata = {
  title: "register",
  ...NO_INDEX_PAGE,
};
export default function Page() {
  return (
    <div>
      <AuthForm type="register" />
    </div>
  );
}
