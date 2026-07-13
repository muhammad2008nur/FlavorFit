import { UserCog, UserRoundPen } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

import AvatarUpload from "./AvatarUpload";

interface GeneralInformationProps {
  avatarUrl: string;
}

const GeneralInformation = ({ avatarUrl }: GeneralInformationProps) => {
  return (
    <div className=" bg-secondary ">
      <div>
        <h1>General information</h1>
        <div className="flex gap-1 items-start mt-2.5">
          <AvatarUpload avatarUrl={avatarUrl} />
          <div className="w-full">
            <label className="text-foreground-nav/75 text-sm font-light">
              Full name
              {/* <UserRoundPen size={20}  />
              <Input type="text" /> */}
              <div className="flex items-center gap-2 rounded-full mt-0.5 bg-background-nav/60 px-3">
                <UserCog color="#707070" width={22} />
                <Input
                  type="text"
                  className="w-full font-bold text-sm text-foreground-nav placeholder:text-foreground/35 placeholder:text-[15px]  placeholder:font-light focus-visible:ring-0 focus-visible:border-0 bg-transparent outline-0"
                  placeholder="Full name"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      {/**Middle Side */}
    </div>
  );
};

export default GeneralInformation;
