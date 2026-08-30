"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";

import {
  GetProfileDocument,
  GetProfileQuery,
  UpdateProfileDocument,
} from "@/shared/api/__generated__/graphql";

import { ProfileData } from "../profile.types";
import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";

const getFormValues = (
  data: GetProfileQuery | undefined,
): ProfileData | undefined =>
  data
    ? {
        fullName: data.me.profile?.fullName ?? "",
        email: data.me.email,
        age: data.me.profile?.age,
        gender: data.me.profile?.gender,
        bio: data.me.profile?.bio ?? "",
        sites: data.me.profile?.sites ?? [],
        growth: data.me.measurements?.heightCm,
        arm: data.me.measurements?.armCm,
        chest: data.me.measurements?.chestCm,
        thigh: data.me.measurements?.thighCm,
        currentWeight: data.me.measurements?.weightKg,
        desiredWeight: data.me.measurements?.goalWeightKg,
        waist: data.me.measurements?.waistCm,
        nutritionGoal: data.me.measurements?.nutritionGoal,
        activityLevel: data.me.measurements?.activityLevel,
      }
    : undefined;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { data, refetch } = useQuery(GetProfileDocument);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    values: getFormValues(data),
  });

  const onSubmit = async (formValues: ProfileData) => {
    console.log(formValues);
    try {
      if (formValues) {
        const res = await addProfileData({
          variables: {
            data: {
              email: formValues.email,
              profile: {
                fullName: formValues.fullName,
                age: Number(formValues.age),
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
        if (res.data) {
          console.log(res.data.updateProfile);
          reset({
            email: formValues.email,
            fullName: formValues.fullName,
            gender: formValues.gender,
            age: formValues.age,
            sites: formValues.sites,
            growth: formValues.growth,
            arm: formValues.arm,
            chest: formValues.chest,
            thigh: formValues.thigh,
            currentWeight: formValues.currentWeight,
            desiredWeight: formValues.desiredWeight,
            waist: formValues.waist,
            nutritionGoal: formValues.nutritionGoal,
            activityLevel: formValues.activityLevel,
          });
          setIsEditing((prev) => !prev);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [addProfileData, { data: updateProfileData }] = useMutation(
    UpdateProfileDocument,
  );
  const formNameProfile = {
    email: "email",
    fullName: "fullName",
    age: "age",
    gender: "gender",
    bio: "bio",
    sites: "sites",
  } as const;
  const formNameMeasurements = {
    growth: "growth",
    currentWeight: "currentWeight",
    desiredWeight: "desiredWeight",
    waist: "waist",
    chest: "chest",
    thigh: "thigh",
    arm: "arm",
    nutritionGoal: "nutritionGoal",
    activityLevel: "activityLevel",
  } as const;
  return (
    <div className="gap-3.5 bg-background font-outfit w-11/12 m-auto">
      {/* <div className="size-90 bg-secondary rounded-4xl"></div> */}
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold gap-2.5">
        <div className="flex justify-between px-1.5">
          <div className="flex gap-1.5 ">
            <UserCog></UserCog>
            <h1>Personal Information</h1>
          </div>{" "}
          <div>
            {!isEditing ? (
              <Button
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
                    setIsEditing((prev) => !prev);
                    setFormKey((prev) => prev + 1);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        <div className=" justify-center gap-15">
          <form
            key={formKey}
            id="profile-form"
            className="flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
              <GeneralInformation
                control={control}
                formName={formNameProfile}
                isEditing={isEditing}
                register={register}
                avatarUrl={data?.me.profile?.avatarUrl}
                onAvatarUpload={() => refetch()}
              />
            </div>
            <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
              <BodyMeasurements
                control={control}
                register={register}
                formName={formNameMeasurements}
                isEditing={isEditing}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
