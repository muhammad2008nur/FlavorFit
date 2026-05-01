import {
  BarChart,
  BookOpen,
  ClipboardList,
  Home,
  MessageCircle,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import { MenuItem } from "@/shared/components/custom-ui/nav-menu/nav.type";

import { PAGES } from "@/shared/config/page.config";

export const navMenuInfo: MenuItem[] = [
  {
    label: "Home",
    href: PAGES.HOME,
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
  { label: "Forum", href: PAGES.FORUM, icon: MessageCircle },
];
