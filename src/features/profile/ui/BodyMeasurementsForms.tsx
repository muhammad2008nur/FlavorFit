import { Dumbbell, Goal, PersonStanding, Ruler, Scale } from "lucide-react";
import Image from "next/image";
import { FunctionComponent } from "react";

import {
  ActivityLevel,
  NutritionGoal,
} from "@/shared/api/__generated__/graphql";

import LevelsField from "./body-measurenents-fields/LevelsField";
import MeasurementField from "./body-measurenents-fields/MeasurementField";

const nutritionGoalOptions = [
  { value: NutritionGoal.WeightLoss, label: "Weight Loss" },
  { value: NutritionGoal.Maintenance, label: "Maintenance" },
  { value: NutritionGoal.MuscleGain, label: "Muscle Gain" },
];

const activityLevel = [
  { value: ActivityLevel.Sedentary, label: "Sedentary" },
  { value: ActivityLevel.Light, label: "Lightly active" },
  { value: ActivityLevel.Moderately, label: "Moderately active" },
  { value: ActivityLevel.Active, label: "Active" },
  { value: ActivityLevel.ExtraActive, label: "Extra active" },
];

interface BodyMeasurementsProps {
  isEditing: boolean;
}

const BodyMeasurements: FunctionComponent<BodyMeasurementsProps> = ({
  isEditing,
}) => {
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
            formName="growth"
            isEditing={isEditing}
            label="Growth"
            Icon={PersonStanding}
            metric="cm"
          />
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              formName="currentWeight"
              isEditing={isEditing}
              label="Current weight"
              Icon={Scale}
              metric="kg"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              formName="desiredWeight"
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
              formName="waist"
              isEditing={isEditing}
              label="Waist circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              formName="chest"
              isEditing={isEditing}
              label="Chest circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              formName="thigh"
              isEditing={isEditing}
              label="Thigh circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              formName="arm"
              isEditing={isEditing}
              label="Arm circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
        </div>
        <LevelsField
          isEditing={isEditing}

          formName="nutritionGoal"
          Icon={Goal}
          placeholder="Weight Loss"
          label="Set your nutritional goals"
          type={nutritionGoalOptions}
        />
        <LevelsField
          isEditing={isEditing}
          formName="activityLevel"
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
