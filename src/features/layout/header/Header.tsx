"use client";
import { Icons } from "next/dist/lib/metadata/types/metadata-types";
import Link from "next/link";

import NavInfo from "@/shared/components/custom-ui/nav-info/navInfo";
import { NavMenu } from "@/shared/components/custom-ui/nav-menu/NavMenu";

import { PAGES } from "../../../shared/config/page.config";
import { useAuth } from "../../../shared/hooks/useAuth";
import { navInfoIcons } from "./nav-info.data";
import { navMenuInfo } from "./nav-menu.data";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="p-7 gap-7.5 items-center  flex justify-between ">
      <div className="flex gap-8 ">
        <Link
          className="size-10 flex text-2xl font-lato rounded-full font-extrabold text-white bg-linear-to-tl from-[#816ae8] to-[#9d8af8] items-center justify-center "
          href={PAGES.DASHBOARD}
        >
          F
        </Link>
        <NavMenu menu={navMenuInfo} />
      </div>
      <NavInfo
        userInfo={{
          avatarUrl: "/path/to/avatar.jpg",
          name: "John Doe",
          username: user?.email || "johnd242525oe",
        }}
        icons={navInfoIcons}
      />
    </header>
  );
}
