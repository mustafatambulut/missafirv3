"use client";
import Button from "@/components/atoms/button/Button";

import { useAppDispatch } from "@/redux/hooks";
import { updateCurrentStep } from "@/redux/features/ownerSlice/ownerSlice";
import { STEP_2, STEP_4 } from "@/redux/features/ownerSlice/enum";

import ChevronLeft from "../../../../public/images/chevron_left.svg";

const BecomeOwnerCalculateResults = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-y-5 my-14">
      <h1 className="text-28 lg:text-4xl text-gray-800 font-mi-sans-semi-bold">
        Your Home's Estimated Monthly Earnings:
      </h1>
      <div className="text-primary text-6xl">26.315 - 28.472 ₺</div>
      <p className="text-lg text-gray-700">
        *Please note: These numbers are estimates. Your home's true potential
        rental income will be determined after an evaluation by our specialists.
      </p>
      <p className="text-2xl text-gray-800">
        Easily rent out your home and maximize your earnings with Missafir. Get
        an offer now.
      </p>
      <Button
        variant="btn-primary"
        className="border-none w-72"
        onClick={() => dispatch(updateCurrentStep(STEP_4))}>
        <div>
          <span>Get an offer</span>
        </div>
      </Button>
      <span
        className="cursor-pointer text-primary text-22 flex items-center gap-x-2"
        onClick={() => dispatch(updateCurrentStep(STEP_2))}>
        <ChevronLeft className="fill-primary scale-75" />
        <span>I want to calculate for another property I own.</span>
      </span>
    </div>
  );
};

export default BecomeOwnerCalculateResults;
