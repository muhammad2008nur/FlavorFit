import {
  ActivityLevel,
  Gender,
  NutritionGoal,
} from "@/shared/api/__generated__/graphql";

export interface ProfileData {
  //   avatarUrl: string | null;
  email: string;
  fullName?: string;
  gender?: Gender | null;
  age?: number | null;
  bio?: string;
  sites: string[];
  growth?: number | null;
  currentWeight?: number | null;
  desiredWeight?: number | null;
  waist?: number | null;
  chest?: number | null;
  thigh?: number | null;
  arm?: number | null;
  activityLevel?: ActivityLevel | null;
  nutritionGoal?: NutritionGoal | null;

  //   bio: string | null;
}
