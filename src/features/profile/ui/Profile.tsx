"use client";

import { UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useQuery } from "@apollo/client/react";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import { GetProfileDocument } from "@/shared/api/__generated__/graphql";
import type { GetProfileQuery } from "@/shared/api/__generated__/graphql";

import useProfileForm from "@/features/profile/hooks/useProfileForm";
import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";
import ProfileError from "./ProfileError";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { data, refetch, loading, error } = useQuery(GetProfileDocument);

  const [lastLoaded, setLastLoaded] = useState<GetProfileQuery | undefined>(
    undefined,
  );
  if (data && data !== lastLoaded) setLastLoaded(data);
  const profile = data ?? lastLoaded;

  const { handleSubmit, onSubmit, reset, methods, getFormValues, saving } =
    useProfileForm(profile, () => setIsEditing(false));

  useEffect(() => {
    if (error && lastLoaded) toast.error(error.message);
  }, [error, lastLoaded]);

  return (
    <div className="gap-3.5 bg-background font-outfit w-11/12 m-auto">
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold gap-2.5">
        <div className="flex justify-between px-1.5">
          <div className="flex gap-1.5">
            <UserCog />
            <h1>Personal Information</h1>
          </div>
          <div>
            {profile &&
              (!isEditing ? (
                <Button
                  key="edit"
                  type="button"
                  variant={"accent"}
                  disabled={loading}
                  onClick={() => setIsEditing(true)}
                >
                  Edit profile
                </Button>
              ) : (
                <>
                  <Button
                    key="save"
                    type="submit"
                    form="profile-form"
                    variant={"accent"}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save the changes"}
                  </Button>
                  <Button
                    key="cancel"
                    type="button"
                    variant={"accent"}
                    disabled={saving}
                    onClick={() => {
                      reset(getFormValues(profile));
                      setFormKey((prev) => prev + 1);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ))}
          </div>
        </div>

        {profile ? (
          <div className="justify-center gap-15">
            <FormProvider {...methods}>
              <form
                key={formKey}
                id="profile-form"
                className="flex"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
                  <GeneralInformation
                    isEditing={isEditing}
                    avatarUrl={profile.me.profile?.avatarUrl ?? null}
                    onAvatarUpload={() => refetch()}
                  />
                </div>
                <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
                  <BodyMeasurements isEditing={isEditing} />
                </div>
              </form>
            </FormProvider>
          </div>
        ) : error ? (
          <ProfileError message={error.message} onRetry={() => refetch()} />
        ) : (
          <ProfileSkeleton />
        )}
      </div>
    </div>
  );
};

export default Profile;
