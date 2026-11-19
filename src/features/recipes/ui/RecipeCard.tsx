import Image from "next/image";

import type { Recipe } from "@/features/recipes/data";

import { RecipeModel } from "@/shared/api/__generated__/graphql";

export default function RecipeCard({ recipe }: { recipe: RecipeModel }) {
  return (
    <div className="font-outfit bg-card grid w-4xs p-2 rounded-4xl">
      <Image
        src={recipe.imageUrl}
        width={693}
        height={319}
        className="w-full h-[150px]"
        alt={recipe.title}
      />
      <div className="flex justify-between items-center font-medium my-2">
        <h2>{recipe.title}</h2>
        {/* {recipe.isNew && (
          <span className="px-1.5 text-sm rounded-md bg-red-300/25 text-red-500/66 ">
            New
          </span>
        )} */}
      </div>
      <p className="text-[12px] text-foreground/50 ">{recipe.description}</p>
      <div className="flex justify-start gap-1 text-[13px] text-[#605F5B] font-medium py-2">
        <span className="rounded-sm px-1 text-foreground/60 font-medium bg-[#605F5B]/15">
          {recipe.mealType}
        </span>
        <span className="bg-[#605F5B]/15 px-1 rounded-sm">
          {recipe.calories} kcal
        </span>
        <span className="bg-[#605F5B]/15 rounded-sm px-1">
          {recipe.cookingTime} min
        </span>
      </div>
      <div className="flex justify-between font-medium pt-1">
        <span className="text-green-600 text-sm px-1 bg-green-300/20 rounded-sm">
          {recipe.difficulty}
        </span>
        <div className="flex gap-2 text-[13px]  text-[#74726b] self-end">
          <span>{recipe.likesCount} like</span>
          {/* <span>{recipe.} view</span> */}
        </div>
      </div>
    </div>
  );
}
