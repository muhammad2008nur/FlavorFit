"use client";
import { cn } from "@/shared/utils";
import { Apple } from "lucide-react";
import { CornerDownRight, Soup } from "lucide-react";
import React, { useState } from "react";

import { filterTypes } from "@/features/recipes/ui/recipes-filter/data";
import { filterTypesElements } from "@/features/recipes/ui/recipes-filter/data";

export default function Filter() {
  const [selected, setSelected] = useState<Record<string, string | null>>({});
  return (
    <>
      {filterTypes.map((item1) => {
        return (
          <React.Fragment key={item1.type}>
            <ul
              key={item1.type}
              className={cn(
                "flex gap-3 items-center font-medium text-sm rounded-4xl  px-2 py-2 my-2",
                selected[item1.type] ? "bg-[#ffd969]" : "",
              )}
            >
              {item1.type === "meal_type" ? (
                <Soup size={24} color="#211c1c" strokeWidth={2} />
              ) : (
                <Apple size={23} color="#211c1c" strokeWidth={2} />
              )}{" "}
              <span key={item1.type}> {item1.value}</span>
            </ul>
            {filterTypesElements.map((item2) => {
              if (item2.parent === item1.type) {
                const isSelected = selected[item1.type] === item2.type;
                return (
                  <li
                    key={`${item1.type}-${item2.type}`}
                    className={cn(
                      "text-xs text-foreground/60 list-none   rounded-4xl hover:bg-muted  flex gap-2 cursor-pointer px-6 py-2",
                      isSelected ? "text-foreground font-medium" : "",
                    )}
                    onClick={() => {
                      setSelected((prev) => ({
                        ...prev,
                        [item1.type]: isSelected ? null : item2.type,
                      }));
                    }}
                  >
                    <CornerDownRight
                      size={16}
                      color={isSelected ? "#000000" : "#4e4646"}
                      strokeWidth={1.5}
                    />
                    <span key={`${item1.type}-${item2.type}`}>
                      {item2.value}
                    </span>
                  </li>
                );
              }
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
