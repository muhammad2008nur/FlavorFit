"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import {
  GetProfileDocument,
  GetProfileQuery,
  UpdateProfileDocument,
} from "@/shared/api/__generated__/graphql";
import { ProfileData, ProfileFormInput, profileSchema } from "../profile-schema.zod";
import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";
import ProfileSkeleton from "./ProfileSkeleton";
import ProfileError from "./ProfileError";
import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";
const getFormValues = (
  data: GetProfileQuery | undefined,
): ProfileData | undefined =>
  data
    ? {
      fullName: data.me.profile?.fullName ?? "",
      email: data.me.email,
      age: data.me.profile?.age ?? null,
      gender: data.me.profile?.gender ?? null,
      bio: data.me.profile?.bio ?? "",
      sites: data.me.profile?.sites ?? [],
      growth: data.me.measurements?.heightCm ?? null,
      arm: data.me.measurements?.armCm ?? null,
      chest: data.me.measurements?.chestCm ?? null,
      thigh: data.me.measurements?.thighCm ?? null,
      currentWeight: data.me.measurements?.weightKg ?? null,
      desiredWeight: data.me.measurements?.goalWeightKg ?? null,
      waist: data.me.measurements?.waistCm ?? null,
      nutritionGoal: data.me.measurements?.nutritionGoal ?? null,
      activityLevel: data.me.measurements?.activityLevel ?? null,
    }
    : undefined;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { data, refetch, loading, error } = useQuery(GetProfileDocument);

  const methods = useForm<ProfileFormInput, unknown, ProfileData>({
    values: getFormValues(data),
    resolver: zodResolver(profileSchema)
  });
  const { handleSubmit, reset } = methods //  ask

  const onSubmit = async (formValues: ProfileData) => {
    try {
      await addProfileData({
        variables: {
          data: {
            email: formValues.email,
            profile: {
              fullName: formValues.fullName,
              age: formValues.age,
              gender: formValues.gender,
              bio: formValues.bio,
              sites: formValues.sites,
            },
            measurements: {
              heightCm: formValues.growth,
              armCm: formValues.arm,
              chestCm: formValues.chest,
              thighCm: formValues.thigh,
              weightKg: formValues.currentWeight,
              goalWeightKg: formValues.desiredWeight,
              waistCm: formValues.waist,
              nutritionGoal: formValues.nutritionGoal,
              activityLevel: formValues.activityLevel,
            },
          },
        },
      });

      setIsEditing((prev) => !prev);
      toast.success('Профиль успешно обновлен')


    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка')


    }
  };
  const [addProfileData] = useMutation(  //ask
    UpdateProfileDocument,
  );
  return (
    <div className="gap-3.5 bg-background font-outfit w-11/12 m-auto">
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold gap-2.5">
        <div className="flex justify-between px-1.5">
          <div className="flex gap-1.5 ">
            <UserCog></UserCog>
            <h1>Personal Information</h1>
          </div>{" "}
          <div>
            {!isEditing ? (
              <Button
                disabled={loading}
                key="edit"
                type="button"
                variant={"accent"}
                onClick={() => setIsEditing((prev) => !prev)}
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
                >
                  Save the changes
                </Button>
                <Button
                  key="cancel"
                  type="button"
                  variant={"accent"}
                  onClick={() => {
                    reset(getFormValues(data));
                    setFormKey((prev) => prev + 1)
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        {loading ? <ProfileSkeleton /> : error ?
          <ProfileError message={error.message} onRetry={() => refetch()} /> :


          (<div className=" justify-center gap-15">
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
                    avatarUrl={data?.me.profile?.avatarUrl}
                    onAvatarUpload={() => refetch()}
                  />
                </div>
                <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
                  <BodyMeasurements
                    isEditing={isEditing}
                  />
                </div>
              </form>
            </FormProvider>
          </div>)
        }
      </div>
    </div >
  );
};

export default Profile;
