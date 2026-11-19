"use client";

import { UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import type { Exact, GetProfileQuery } from "@/shared/api/__generated__/graphql";

import useProfileForm from "@/features/profile/hooks/useProfileForm";
import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";
import { ApolloClient, ErrorLike } from "@apollo/client";

interface ProfileFormProps {
  data: GetProfileQuery;
  error?: ErrorLike;
  loading: boolean;
  refetch: (variables?: Partial<Exact<{ [key: string]: never }>> | undefined) => Promise<ApolloClient.QueryResult<GetProfileQuery>>;
}

const ProfileForm = ({ data, error, loading, refetch }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);



  const { handleSubmit, onSubmit, reset, methods, getFormValues, saving } =
    useProfileForm(data, () => setIsEditing(false));

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <div className="gap-3.5 bg-background font-outfit w-11/12 m-auto">
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold gap-2.5">
        <div className="flex justify-between px-1.5">
          <div className="flex gap-1.5">
            <UserCog />
            <h1>Personal Information</h1>
          </div>
          <div>
            {!isEditing ? (
              <div>

                <Button
                  key="edit"
                  type="button"
                  variant={"accent"}
                  disabled={loading}
                  onClick={() => setIsEditing(true)}
                >
                  Edit profile
                </Button>
              </div>
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
                    reset(getFormValues(data));
                    setFormKey((prev) => prev + 1);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>

            )}
          </div>
        </div>


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
                  avatarUrl={data.me.profile?.avatarUrl ?? null}
                  onAvatarUpload={() => refetch()}
                  isEmailVerified={data.me.isEmailVerified}
                />
              </div>
              <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12 ">
                <BodyMeasurements isEditing={isEditing} />
              </div>
            </form>
          </FormProvider>
        </div>


      </div>
    </div>
  );
};

export default ProfileForm;
