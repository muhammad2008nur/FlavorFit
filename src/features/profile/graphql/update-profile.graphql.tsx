import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: UserInputUpdate!) {
    updateProfile(data: $data) {
      id
      email

      profile {
        age
        bio
        fullName
      }
      measurements {
        activityLevel
        waistCm
        weightKg
        armCm
        chestCm
        goalWeightKg
        heightCm
        nutritionGoal
        thighCm
      }
    }
  }
`;
