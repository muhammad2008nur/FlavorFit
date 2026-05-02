import { Button } from "../../ui/button";
import { NavInfoProps } from "./nav-info.types";
import UserInfo from "./user-info";

const NavInfo = ({ userInfo, icons }: NavInfoProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-2">
        {icons.map((Icon, index) => (
          <Button variant={"soft"} size={"icon"} className="" key={index}>
            <Icon className="text-[#15090996] size-5" key={index} />
          </Button>
        ))}
      </div>
      <UserInfo {...userInfo} />
    </div>
  );
};

export default NavInfo;
