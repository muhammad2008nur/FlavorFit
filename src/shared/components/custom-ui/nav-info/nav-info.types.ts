import { LucideIcon } from "lucide-react";

export interface NavInfoProps {
  userInfo: UserInfo;
  icons: LucideIcon[];
}
export interface UserInfo {
  name: string;
  username: string;
  avatarUrl: string;
}
