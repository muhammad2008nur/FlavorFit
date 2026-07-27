"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";

import {
  GetProfileDocument,
  UpdateProfileDocument,
} from "@/shared/api/__generated__/graphql";

import { ProfileData } from "../profile.types";
import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, refetch } = useQuery(GetProfileDocument);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    values: data
      ? {
          fullName: data.me.profile?.fullName ?? "",
          email: data.me.email,
          age: data.me.profile?.age ?? null,
          gender: data.me.profile?.gender ?? null,
        }
      : undefined,
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
                age: formValues.age,
                gender: formValues.gender,
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
  const formName = {
    email: "email",
    fullName: "fullName",
    age: "age",
    gender: "gender",
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
              <Button
                key="save"
                type="submit"
                form="profile-form"
                variant={"accent"}
              >
                Save the changes
              </Button>
            )}
          </div>
        </div>
        <div className=" justify-center gap-15">
          <form
            id="profile-form"
            className="flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
              <GeneralInformation
                control={control}
                formName={formName}
                isEditing={isEditing}
                register={register}
                avatarUrl={data?.me.profile?.avatarUrl}
                onAvatarUpload={() => refetch()}
              />
            </div>
            <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
              <BodyMeasurements />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
