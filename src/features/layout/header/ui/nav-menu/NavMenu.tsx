"use client";
import { usePathname } from "next/navigation";

import { MenuItem } from "@/features/layout/header/types/nav-menu.types";

import NavMenuItem from "./NavMenuItem";

interface Props {
  menu: MenuItem[];
}

export default function NavMenu({ menu }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.includes(href);
  return (
    <nav className="flex gap-3.5">
      {menu.map((menuItem) => (
        <NavMenuItem
          key={menuItem.href}
          menuItem={menuItem}
          isActive={isActive(menuItem.href)}
        />
      ))}
    </nav>
  );
}
