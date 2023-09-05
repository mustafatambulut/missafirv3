"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  STEP_4,
  STEP_2,
  STEP_3,
  SUCCESS
} from "@/redux/features/ownerSlice/enum";

const BecomeOwner = () => {
  const { currentStep } = useAppSelector((step) => step.ownerReducer);

  switch (currentStep) {
    case STEP_2:
      return <div className="bg-primary-600 w-80 h-80">STEP 2</div>;
    case STEP_3:
      return <div>STEP 3</div>;
    case STEP_4:
      return <div>STEP 4</div>;
    case SUCCESS:
      return <div>STEP 5</div>;
  }
};

export default BecomeOwner;
