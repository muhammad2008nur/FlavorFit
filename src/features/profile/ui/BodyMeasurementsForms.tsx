import { Dumbbell, Goal, PersonStanding, Ruler, Scale } from "lucide-react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Control, UseFormRegister } from "react-hook-form";

import { ProfileData } from "../profile.types";
// import { type } from "../../../../.next/dev/types/routes";
import LevelsField from "./body-measurenents-fields/LevelsField";
import MeasurementField from "./body-measurenents-fields/MeasurementField";

interface BodyMeasurementsProps {
  formName: {
    growth: "growth";
    currentWeight: "currentWeight";
    desiredWeight: "desiredWeight";
    waist: "waist";
    chest: "chest";
    thigh: "thigh";
    arm: "arm";
    nutritionGoal: "nutritionGoal";
    activityLevel: "activityLevel";
  };
  register: UseFormRegister<ProfileData>;
  isEditing: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ProfileData, any, ProfileData>;
}

const BodyMeasurements: FunctionComponent<BodyMeasurementsProps> = ({
  register,
  formName,
  isEditing,
  control,
}) => {
  const nutritionGoalOptions = [
    { value: "WEIGHT_LOSS", label: "Weight Loss" },
    { value: "MAINTENANCE", label: "Maintenance" },
    { value: "MUSCLE_GAIN", label: "Muscle Gain" },
  ];
  const activityLevel = [
    { value: "SEDENTARY", label: "Sedentary" },
    { value: "LIGHT", label: "Lightly active" },
    { value: "MODERATELY", label: "Moderately active" },
    { value: "ACTIVE", label: "Active" },
    { value: "EXTRA_ACTIVE ", label: "Extra active" },
  ];
  return (
    <div className="flex gap-3">
      <Image
        className="h-140 w-auto -mt-4"
        width={484}
        height={1000}
        alt="Woman img"
        src={"/flavotWoman.png"}
      />
      <div className="w-full">
        <span>Body measurements</span>
        <div className="p-1 gap-3.5">
          <MeasurementField
            register={register}
            formName={formName.growth}
            isEditing={isEditing}
            label="Growth"
            Icon={PersonStanding}
            metric="cm"
          />
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.currentWeight}
              isEditing={isEditing}
              label="Current weight"
              Icon={Scale}
              metric="kg"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.desiredWeight}
              isEditing={isEditing}
              label="Desired weight"
              Icon={Scale}
              metric="kg"
            />
          </div>
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.waist}
              isEditing={isEditing}
              label="Waist circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.chest}
              isEditing={isEditing}
              label="Chest weight"
              Icon={Ruler}
              metric="cm"
            />
          </div>
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.thigh}
              isEditing={isEditing}
              label="Thigh circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              register={register}
              formName={formName.arm}
              isEditing={isEditing}
              label="Arm circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
        </div>
        <LevelsField
          formName={formName.nutritionGoal}
          control={control}
          Icon={Goal}
          placeholder="Weight Loss"
          label="Set your nutritional goals"
          type={nutritionGoalOptions}
        />
        <LevelsField
          formName={formName.activityLevel}
          control={control}
          Icon={Dumbbell}
          placeholder="Lightly active"
          label="Define your activity level"
          type={activityLevel}
        />
      </div>
    </div>
  );
};

export default BodyMeasurements;
