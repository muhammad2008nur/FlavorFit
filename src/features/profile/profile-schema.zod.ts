// src/features/profile/profile.schema.ts
import { z } from "zod";

import {
  ActivityLevel,
  Gender,
  NutritionGoal,
} from "@/shared/api/__generated__/graphql";

const emptyToNull = (v: unknown): unknown =>
  v === "" || v === undefined ? null : v;

const toNumberOrNull = (v: unknown): unknown => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

const measurement = (min: number, max: number) =>
  z.preprocess(
    toNumberOrNull,
    z
      .number("Введите число")
      .int("Только целое число")
      .min(min, `Не меньше ${min}`)
      .max(max, `Не больше ${max}`)
      .nullable(),
  );

/* ────────────────────────────────────────────────────────────
   Схема профиля
   ──────────────────────────────────────────────────────────── */

export const profileSchema = z
  .object({
    /* ─── Общая информация ─────────────────────────────── */

    fullName: z
      .string()
      .min(2, "Имя слишком короткое")
      .max(60, "Не больше 60 символов"),

    email: z.email("Некорректный email"),

    age: z.preprocess(
      toNumberOrNull,
      z
        .number()
        .int()
        .min(10, "Минимум 10 лет")
        .max(100, "Максимум 100 лет")
        .nullable(),
    ),

    gender: z.preprocess(emptyToNull, z.enum(Gender).nullable()),

    bio: z.string().trim().max(300, "Не больше 300 символов").default(""),

    sites: z.preprocess(
      (v) =>
        Array.isArray(v)
          ? v.filter((s) => typeof s === "string" && s.trim() !== "")
          : [],
      z
        .array(z.string().url("Введите корректную ссылку"))
        .max(5, "Не больше 5 ссылок"),
    ),

    /* ─── Измерения тела ───────────────────────────────── */

    growth: measurement(50, 250), // рост, см
    currentWeight: measurement(20, 400), // текущий вес, кг
    desiredWeight: measurement(20, 400), // желаемый вес, кг
    waist: measurement(30, 250), // талия, см
    chest: measurement(30, 250), // грудь, см
    thigh: measurement(20, 150), // бедро, см
    arm: measurement(10, 100), // рука, см

    nutritionGoal: z.preprocess(emptyToNull, z.enum(NutritionGoal).nullable()),

    activityLevel: z.preprocess(emptyToNull, z.enum(ActivityLevel).nullable()),
  })
  /* ─── Проверки между полями ──────────────────────────── */
  .refine(
    (v) =>
      v.currentWeight === null ||
      v.desiredWeight === null ||
      Math.abs(v.currentWeight - v.desiredWeight) <= 100,
    {
      message: "Слишком большая разница с текущим весом",
      path: ["desiredWeight"],
    },
  );

/* ────────────────────────────────────────────────────────────
   Типы, выведенные из схемы
   ──────────────────────────────────────────────────────────── */

/** Что лежит в форме ДО валидации — строки из инпутов. */
export type ProfileFormInput = z.input<typeof profileSchema>;

/** Что приходит в onSubmit ПОСЛЕ валидации — уже числа и enum'ы. */
export type ProfileData = z.output<typeof profileSchema>;
