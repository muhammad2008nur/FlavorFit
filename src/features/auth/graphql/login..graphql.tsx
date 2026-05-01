import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: AuthInput!) {
    login(data: $data) {
      user {
        email
        id
        role
      }
    }
  }
`;
