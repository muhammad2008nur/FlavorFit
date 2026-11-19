"use client";
import { useQuery } from "@apollo/client/react";
import React from "react";

import {
  GetRecipesDocument,
  RecipeModel,
} from "@/shared/api/__generated__/graphql";
import { RecipesSort } from "@/shared/api/__generated__/graphql";

import RecipesList from "./RecipesList";
import RecipesFilter from "./recipes-filter/RecipesFilter";

function getCursor(sortBy: RecipesSort, lastRecipe: RecipeModel) {
  switch (sortBy) {
    case RecipesSort.New:
      return {
        date: lastRecipe.createdAt,
        title: lastRecipe.title,
        id: lastRecipe.id,
      };
    case RecipesSort.Popular:
      return {
        views: lastRecipe.views,
        title: lastRecipe.title,
        id: lastRecipe.id,
      };
    case RecipesSort.Recommended:
      return {
        likes: lastRecipe.likesCount,
        title: lastRecipe.title,
        id: lastRecipe.id,
      };
  }
}

export default function Recipes() {
  const [sortBy, setSortBy] = React.useState(RecipesSort.Recommended);
  const { data, loading, error, fetchMore } = useQuery(GetRecipesDocument, {
    variables: {
      data: {
        sort: sortBy,
        take: 9,
      },
    },
  });
  const lastRecipe = data?.feedRecipes.at(-2);

  const handleLoadMore = () => {
    if (lastRecipe) {
      console.log(lastRecipe);
      fetchMore({
        variables: {
          data: {
            cursor: getCursor(sortBy, lastRecipe),
            sort: sortBy,
            take: 9,
          },
        },
      });
    }
  };

  return (
    <div className="m-4 flex gap-3">
      <aside className="max-w-70 w-full  p-4 bg-card rounded-4xl">
        <RecipesFilter />
      </aside>
      <main>
        {loading && !data ? (
          <p>Загрузка рецептов...</p>
        ) : error ? (
          <p>Ошибка загрузки рецептов: {error.message}</p>
        ) : data ? (
          <RecipesList
            sort={sortBy}
            onSortChange={setSortBy}
            onLoadMore={handleLoadMore}
            recipes={data.feedRecipes.slice(0, -1)}
          />
        ) : (
          <p>Рецепты не найдены.</p>
        )}
      </main>
    </div>
  );
}
