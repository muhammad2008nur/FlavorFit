import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: AuthInput!) {
    register(data: $data) {
      user {
        email
        id
        role
      }
    }
  }
`;
