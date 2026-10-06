import { LucideIcon } from "lucide-react";

export interface NavInfoProps {
  userInfo: UserInfoData;
  icons: LucideIcon[];
}
export interface UserInfoData {
  name: string;
  isEmailVerified: boolean | null | undefined;
  username: string;
  avatarUrl: string;
}
