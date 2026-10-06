import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  GetProfileQuery,
  UpdateProfileDocument,
} from "@/shared/api/__generated__/graphql";

import {
  ProfileData,
  ProfileFormInput,
  profileSchema,
} from "@/features/profile/profile-schema.zod";

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
        sites: [...new Set(data.me.profile?.sites ?? [])],
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

export default function useProfileForm(
  data: GetProfileQuery | undefined,
  onSaved: () => void,
) {
  const values = useMemo(() => getFormValues(data), [data]);

  const methods = useForm<ProfileFormInput, unknown, ProfileData>({
    values,
    resolver: zodResolver(profileSchema),
  });
  const { handleSubmit, reset } = methods;

  const [addProfileData, { loading: saving }] = useMutation(
    UpdateProfileDocument,
  );

  const onSubmit = async (formValues: ProfileData) => {
    if (saving) return;

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

      onSaved();
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return { handleSubmit, onSubmit, reset, methods, getFormValues, saving };
}
