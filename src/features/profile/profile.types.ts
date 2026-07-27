import { Gender } from "@/shared/api/__generated__/graphql";

export interface ProfileData {
  //   avatarUrl: string | null;
  email: string | null;
  fullName: string | null;
  gender: Gender | null;
  age: number | null;
  //   bio: string | null;
  //   sites?: string[] | null;
}
