import { gql } from "@apollo/client";

export const GET_RECIPES_QUERY = gql`
  query getRecipes($data: RecipesQueryInput!) {
    feedRecipes(data: $data) {
      id
      imageUrl
      mealType
      title
      calories
      likesCount
      description
      cookingTime
      difficulty
      views
      createdAt
    }
  }
`;
