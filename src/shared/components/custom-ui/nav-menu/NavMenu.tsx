"use client";
import { usePathname } from "next/navigation";

import NavElement from "./NavMenuItem";
import { MenuItem } from "./nav.type";

interface Props {
  menu: MenuItem[];
}

export function NavMenu({ menu }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.includes(href);
  return (
    <nav className="flex gap-3.5">
      {menu.map((menuItem) => (
        <NavElement
          key={menuItem.href}
          menuItem={menuItem}
          isActive={isActive(menuItem.href)}
        />
      ))}
    </nav>
  );
}
