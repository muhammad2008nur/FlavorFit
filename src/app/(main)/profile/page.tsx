import Profile from "@/features/profile/ui/Profile";
import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Profile',
  ...NO_INDEX_PAGE
}
export default function page() {
  return (
    <div>
      <Profile />
    </div>
  );
}
