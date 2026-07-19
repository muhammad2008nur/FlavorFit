import {
  Dumbbell,
  Goal,
  PersonStanding,
  Ruler,
  Scale,
  Weight,
} from "lucide-react";
import Image from "next/image";
import { FunctionComponent } from "react";

import LevelsField from "./body-measurenents-fields/LevelsField";
import MeasurementField from "./body-measurenents-fields/MeasurementField";

interface BodyMeasurementsProps {}

const BodyMeasurements: FunctionComponent<BodyMeasurementsProps> = () => {
  return (
    <div className="flex gap-3">
      <Image
        className="h-140 w-auto"
        width={484}
        height={1000}
        alt="Woman img"
        src={"/flavotWoman.png"}
      />
      <div className="w-full">
        <span>Body measurements</span>
        <div className="mt-2 p-1 gap-3.5">
          <MeasurementField label="Growth" Icon={PersonStanding} metric="cm" />
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField label="Current weight" Icon={Scale} metric="kg" />
          </div>
          <div className="flex-1">
            <MeasurementField label="Desired weight" Icon={Scale} metric="kg" />
          </div>
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              label="Waist circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField label="Chest weight" Icon={Ruler} metric="cm" />
          </div>
        </div>
        <div className="flex p-1 gap-3.5">
          <div className="flex-1">
            <MeasurementField
              label="Thigh circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
          <div className="flex-1">
            <MeasurementField
              label="Arm circumference"
              Icon={Ruler}
              metric="cm"
            />
          </div>
        </div>
        <LevelsField
          Icon={Goal}
          placeholder="Weight Loss"
          label="Set your nutritional goals"
        />
        <LevelsField
          Icon={Dumbbell}
          placeholder="Lightly active"
          label="Define your activity level"
        />
      </div>
    </div>
  );
};

export default BodyMeasurements;
