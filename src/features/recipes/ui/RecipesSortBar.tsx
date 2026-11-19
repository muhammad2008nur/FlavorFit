"use client";
import { cn } from "@/shared/utils";
import { ArrowDownUp, Clock, Flame, Sparkles } from "lucide-react";

import { RecipesSort } from "@/shared/api/__generated__/graphql";

const sortOptions = [
  { value: RecipesSort.Recommended, label: "Recommended", icon: Sparkles },
  { value: RecipesSort.Popular, label: "Popular", icon: Flame },
  { value: RecipesSort.New, label: "New", icon: Clock },
];

interface RecipesSortBarProps {
  value: RecipesSort;
  onChange: (value: RecipesSort) => void;
}

export default function RecipesSortBar({
  value,
  onChange,
}: RecipesSortBarProps) {
  return (
    <div className="font-outfit flex flex-wrap items-center justify-between gap-3 rounded-4xl bg-card px-4 py-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <ArrowDownUp size={18} color="#211c1c" strokeWidth={2} />
        <span>Sort by</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Sort recipes"
        className="flex gap-1 rounded-4xl bg-background p-1"
      >
        {sortOptions.map(({ value: optionValue, label, icon: Icon }) => {
          const isActive = optionValue === value;
          return (
            <button
              key={optionValue}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(optionValue)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-4xl px-3 py-1.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-muted",
                isActive && "bg-[#ffd969] text-foreground hover:bg-[#ffd969]",
              )}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
