"use client";
import { isMobile } from "react-device-detect";

const BenefitSkeleton = () => {
  const dummyData = new Array(3).fill(null);
  const mobilDummyData = new Array(3).fill(null);

  const iterableData = isMobile ? mobilDummyData : dummyData;

  const BenefitCard = () => {
    return (
      <div className="w-full h-auto lg:mr-4 pb-2 lg:mb-2 my-6 bg-white">
        <div className="w-full h-auto">
          <div className="flex p-3 justify-center">
            <div className="w-12 h-12 rounded-lg bg-gray-300" />
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="bg-gray-200 w-56 h-6 rounded-md" />
            <div className="bg-gray-200 w-60 h-6 rounded-md mt-2" />
            <div className="mt-4 flex flex-col w-full gap-y-2 items-center">
              <div className="w-full h-5 bg-gray-100 rounded-md" />
              <div className="w-[90%] h-5 bg-gray-100 rounded-md" />
              <div className="w-[95%] h-5 bg-gray-100 rounded-md" />
              <div className="w-[40%] h-5 bg-gray-100 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-28 animate-pulse">
      <div className="text-center px-4">
        <div className="w-40 lg:w-60 lg:h-7 h-7 rounded-lg bg-gray-200 mx-auto" />
        <div className="lg:w-[670px] w-3/4 lg:h-5 h-7 rounded-md bg-gray-200 mx-auto lg:mt-4 mt-2" />
        <div className="w-[95%] lg:w-[466px] lg:h-5 h-4 rounded-md bg-gray-100 mx-auto lg:mt-4 mt-2" />
        <div className="w-[90%] lg:hidden lg:h-8 h-4 rounded-xl bg-gray-100 mx-auto lg:mt-4 mt-2" />
        <div className="w-[85%] lg:hidden lg:h-8 h-4 rounded-xl bg-gray-100 mx-auto lg:mt-4 mt-2" />
      </div>
      <div className="mx-3 my-10">
        <div className="px-3 lg:mt-2 flex lg:flex-row flex-col w-full">
          {iterableData.map((i, key) => (
            <BenefitCard key={key} />
          ))}
        </div>
      </div>
      <div className="flex p-3 justify-center">
        <div className="w-48 h-12 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default BenefitSkeleton;
