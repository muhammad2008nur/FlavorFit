import { gql } from "@apollo/client";

export const PASSWORD_RESET = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`;
