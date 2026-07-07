import { gql } from "@apollo/client";

export const Verify_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;
