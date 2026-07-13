"use client";
import { useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";

import { MeDocument, MeQuery } from "@/shared/api/__generated__/graphql";

import AvatarUpload from "./AvatarUpload";
import GeneralInformation from "./GeneralInformationForms";

interface ProfileProps {}

const Profile = () => {
  //   const { register } = useForm();
  // const { data } = useQuery(MeDocument);
  // const [Data, setData] = React.useState<MeQuery | null>(null);
  // React.useEffect(() => {
  //   if (data?.me.profile?.avatarUrl) {
  //     setData(data);
  //   }
  // }, []);
  return (
    <div className="flex gap-3.5 bg-background ">
      <div className="size-90 bg-secondary rounded-4xl">{/** Left Side */}</div>
      <div className="bg-secondary py-5 px-4.5 rounded-4xl font-extrabold">
        <div className="flex gap-1.5  ">
          <UserCog></UserCog>
          <h1>Personal Information</h1>
        </div>{" "}
        <div
          className=" rounded-4xl outline-background outline-2  px-4 py-4 mt-5 w-lg
"
        >
          <GeneralInformation avatarUrl={""} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
