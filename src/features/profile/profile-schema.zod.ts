import { z } from "zod";

import {
  ActivityLevel,
  Gender,
  NutritionGoal,
} from "@/shared/api/__generated__/graphql";

const MAX_WEIGHT_GAP = 100;

const emptyToNull = (v: unknown): unknown =>
  v === undefined || v === "" ? null : v;

const toNumberOrNull = (v: unknown): unknown => {
  if (v === null || v === undefined) return null;
  if (typeof v !== "string") return v;

  const trimmed = v.trim();
  if (trimmed === "") return null;

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const noLeadingZeros = z.unknown().superRefine((v, ctx) => {
  if (typeof v === "string" && /^0\d/.test(v.trim())) {
    ctx.addIssue({ code: "custom", message: "Remove the leading zero" });
  }
});

const measurement = (min: number, max: number) =>
  noLeadingZeros.pipe(
    z.preprocess(
      toNumberOrNull,
      z
        .number("Enter a number")
        .int("Whole numbers only")
        .min(min, `Must be at least ${min}`)
        .max(max, `Must be at most ${max}`)
        .nullable(),
    ),
  );

const nullableEnum = <T extends Record<string, string>>(values: T) =>
  z.preprocess(emptyToNull, z.enum(values).nullable());

export const profileSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name is too short")
      .max(60, "No more than 60 characters"),

    email: z.email("Invalid email"),

    age: noLeadingZeros.pipe(
      z.preprocess(
        toNumberOrNull,
        z
          .number("Enter a number")
          .int("Whole numbers only")
          .min(10, "Must be at least 10")
          .max(100, "Must be at most 100")
          .nullable(),
      ),
    ),

    gender: nullableEnum(Gender),

    bio: z.string().trim().max(300, "No more than 300 characters").default(""),

    sites: z
      .array(z.url({ protocol: /^https?$/, error: "Enter a valid link" }))
      .max(5, "No more than 5 links"),

    growth: measurement(50, 250),
    currentWeight: measurement(20, 400),
    desiredWeight: measurement(20, 400),
    waist: measurement(30, 250),
    chest: measurement(30, 250),
    thigh: measurement(20, 150),
    arm: measurement(10, 100),

    nutritionGoal: nullableEnum(NutritionGoal),

    activityLevel: nullableEnum(ActivityLevel),
  })
  .refine(
    (v) =>
      v.currentWeight === null ||
      v.desiredWeight === null ||
      Math.abs(v.currentWeight - v.desiredWeight) <= MAX_WEIGHT_GAP,
    {
      message: `No more than ${MAX_WEIGHT_GAP} kg away from your current weight`,
      path: ["desiredWeight"],
    },
  );

export type ProfileFormInput = z.input<typeof profileSchema>;

export type ProfileData = z.output<typeof profileSchema>;
