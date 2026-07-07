import Image from "next/image";

import type { UserInfo } from "./nav-info.types";

const UserInfo = ({ name, username, isEmailVerified }: UserInfo) => {
  return (
    <div>
      <div className="flex items-center ">
        {/* do avatar by div tag */}
        <div className="size-10 rounded-full bg-amber-400"></div>

        <div className="ml-2 font-lato ">
          <p className="text-md font-bold">
            {name.length > 10 ? `${name.slice(0, 10)}...` : name}
          </p>
          <p className="text-xs text-gray-500/75 font-bold  ">
            {username.length > 10 ? `${username.slice(0, 10)}...` : username}
          </p>
        </div>
      </div>
      {!isEmailVerified && (
        <p className="text-xs text-red-500 font-bold mb-2 text-right ">
          Email unverified
        </p>
      )}
    </div>
  );
};

export default UserInfo;
