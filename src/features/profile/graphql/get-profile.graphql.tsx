import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile {
    me {
      id
      email
      profile {
        id
        age
        bio
        fullName
        gender
        avatarUrl
      }
      measurements {
        activityLevel
        waistCm
        weightKg
        armCm
        chestCm
        nutritionGoal
        thighCm
        goalWeightKg
        heightCm
      }
    }
  }
`;
