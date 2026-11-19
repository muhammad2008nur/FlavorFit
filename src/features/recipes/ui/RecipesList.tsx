import RecipeCard from "@/features/recipes/ui/RecipeCard";
import RecipesSortBar from "@/features/recipes/ui/RecipesSortBar";

import { Button } from "@/shared/components/ui/button";

import { RecipeModel, RecipesSort } from "@/shared/api/__generated__/graphql";

import styles from "./recipe-grid.module.css";

interface Recipes {
  onLoadMore: () => void;
  recipes: RecipeModel[];
  sort: RecipesSort;
  onSortChange: (sort: RecipesSort) => void;
}
export default function RecipesList({
  onLoadMore,
  recipes,
  sort,
  onSortChange,
}: Recipes) {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-5">
        <RecipesSortBar value={sort} onChange={onSortChange} />
      </div>
      <div className={styles.recipes}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        <Button onClick={() => onLoadMore()} type="button">
          onLoadMore
        </Button>
      </div>
    </div>
  );
}
