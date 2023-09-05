"use client";
import { useAppDispatch } from "@/redux/hooks";

import { STEP_2 } from "@/redux/features/ownerSlice/enum";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";

import ChevronLeft from "../../../../public/images/chevron_left.svg";

const BecomeOwnerSuccess = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-y-5 my-14">
      <h1 className="text-28 lg:text-4xl text-gray-800 font-mi-sans-semi-bold text-center">
        Awesome! We've received your request successfully.
      </h1>
      <p className="text-lg lg:text-2xl text-gray-800 text-center">
        One of our property managers will reach out to you shortly to guide you
        through the process!
      </p>
      <span
        className="cursor-pointer text-primary text-lg lg:text-22 flex items-center gap-x-2"
        onClick={() => dispatch(updateCurrentStep(STEP_2))}>
        <ChevronLeft className="fill-primary scale-75" />
        <span>I want to calculate for another property I own.</span>
      </span>
    </div>
  );
};

export default BecomeOwnerSuccess;
