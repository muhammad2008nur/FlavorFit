import { useQuery } from "@apollo/client/react"
import { GetProfile } from "@/features/auth/graphql/getProfile.graphql"
export function Profile() {
    const { data, } = useQuery(GetProfile)
}