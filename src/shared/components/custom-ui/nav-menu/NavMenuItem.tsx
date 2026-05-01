"use client";
import { cn } from "@/shared/utils";
import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../../ui/button";
import { MenuItem } from "./nav.type";

interface Props {
  menuItem: MenuItem;
  isActive: boolean;
}
function NavElement({ menuItem, isActive }: Props) {
  return (
    <Link
      className={cn(
        "py-2.5 px-4 flex gap-2 items-center font-roboto rounded-4xl outline-1 text-[14px] font-medium hover:opacity-75 hover:outline-ring  ",
        isActive
          ? "bg-black   text-white"
          : "bg-background-nav text-foreground-nav/75",
      )}
      href={menuItem.href}
    >
      <menuItem.icon size={23} />
      <span>{menuItem.label}</span>
    </Link>
  );
}

export default NavElement;
