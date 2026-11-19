"use client";

import { useQuery } from "@apollo/client/react";

import { GetProfileDocument } from "@/shared/api/__generated__/graphql";

import ProfileError from "./ProfileError";
import ProfileForm from "./ProfileForm";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const { data, refetch, loading, error } = useQuery(GetProfileDocument);

  if (data)
    return (
      <ProfileForm
        refetch={refetch}
        data={data}
        error={error}
        loading={loading}
      />
    );
  else if (error)
    return <ProfileError message={error.message} onRetry={() => refetch()} />;
  else if (loading) return <ProfileSkeleton />;
};

export default Profile;
