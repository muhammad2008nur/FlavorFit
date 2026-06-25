import { gql } from "@apollo/client";

export const NEW_TOKEN = gql`
        query NewToken{
            newTokens {
                user{
                    id
                }
            }
        }
`