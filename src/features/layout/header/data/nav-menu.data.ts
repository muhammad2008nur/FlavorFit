import {
  BarChart,
  BookOpen,
  ClipboardList,
  Home,
  Settings,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import { MenuItem } from "@/features/layout/header/types/nav-menu.types";

import { PAGES } from "@/shared/config/page.config";

export const navMenuInfo: MenuItem[] = [
  {
    label: "Home",
    href: PAGES.DASHBOARD,
    icon: Home,
  },
  {
    label: "Meal Plans",
    href: PAGES.MEAL_PLANS,
    icon: ClipboardList,
  },
  {
    label: "Nutrition",
    href: PAGES.NUTRITION,
    icon: Utensils,
  },
  {
    label: "Analytics",
    href: PAGES.ANALYTICS,
    icon: BarChart,
  },
  {
    label: "Orders Groceries",
    href: PAGES.ORDER_GROCERIES,
    icon: ShoppingCart,
  },
  {
    label: "Recipes",
    href: PAGES.RECIPES,
    icon: BookOpen,
  },
  { label: "Profile", href: PAGES.PROFILE, icon: Settings },
];
