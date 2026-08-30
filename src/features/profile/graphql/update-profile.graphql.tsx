import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: UserInputUpdate!) {
    updateProfile(data: $data) {
      id
      email
      profile {
        id
        age
        bio
        fullName
        gender
        avatarUrl
        sites
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
