"use client";
import { useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";

import { MeDocument } from "@/shared/api/__generated__/graphql";

import BodyMeasurements from "./BodyMeasurementsForms";
import GeneralInformation from "./GeneralInformationForms";

// interface ProfileProps {}

const Profile = () => {
  //   const { register } = useForm();
  const { data, refetch } = useQuery(MeDocument);
  return (
    <div className="gap-3.5 bg-background font-outfit w-11/12 m-auto">
      {/* <div className="size-90 bg-secondary rounded-4xl"></div> */}
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold gap-2.5">
        <div className="flex gap-1.5 ">
          <UserCog></UserCog>
          <h1>Personal Information</h1>
        </div>{" "}
        <div className="flex justify-center gap-15">
          <div
            className=" rounded-4xl outline-background outline-2 px-4 py-4 mt-5 w-6/12
"
          >
            <GeneralInformation
              avatarUrl={data?.me.profile?.avatarUrl}
              onAvatarUpload={() => refetch()}
            />
          </div>
          <div className="rounded-4xl outline-background outline-2 px-4 py-4 mt-5 w-6/12">
            <BodyMeasurements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
