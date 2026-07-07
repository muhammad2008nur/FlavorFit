import { gql } from "@apollo/client";

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestPasswordReset($data: RequestPasswordResetTokenInput!) {
    requestPasswordReset(data: $data)
  }
`;
