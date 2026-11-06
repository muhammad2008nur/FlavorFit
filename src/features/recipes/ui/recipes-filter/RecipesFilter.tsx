import Filter from "@/features/recipes/ui/recipes-filter/Filter";
import { SearchFilter } from "@/features/recipes/ui/recipes-filter/SearchFilter";

export default function RecipesFilter() {
  return (
    <>
      <SearchFilter />
      <div className="my-4 font-outfit ">
        <Filter />
      </div>
    </>
  );
}
