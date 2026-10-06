import Logout from "@/features/auth/ui/logout/Logout";
import { NavInfoProps } from "@/features/layout/header/types/nav-info.types";

import { Button } from "@/shared/components/ui/button";

import UserInfo from "./UserInfo";

export default function NavInfo({ userInfo, icons }: NavInfoProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-2">
        {icons.map((Icon, index) => (
          <Button variant={"soft"} size={"icon"} key={index}>
            <Icon className="text-[#15090996] size-5" key={index} />
          </Button>
        ))}
        <Logout />
      </div>

      <UserInfo {...userInfo} />
    </div>
  );
}
