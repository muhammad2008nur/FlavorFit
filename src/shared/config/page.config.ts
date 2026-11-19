const DASHBOARD = "/dashboard";

export const PAGES = {
  DASHBOARD,
  MEAL_PLANS: `${DASHBOARD}/meal-plans`,
  NUTRITION: `${DASHBOARD}/nutrition`,
  ANALYTICS: `${DASHBOARD}/analytics`,
  ORDER_GROCERIES: `${DASHBOARD}/order-groceries`,
  RECIPES: `${DASHBOARD}/recipes`,
  PROFILE: `${DASHBOARD}/profile`,
  AUTH: "/auth",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REQUEST_RESET_PASSWORD: "/auth/request-reset-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
} as const;
