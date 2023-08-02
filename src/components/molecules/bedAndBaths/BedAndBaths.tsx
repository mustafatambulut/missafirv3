import React from "react";

import { IBedAndBaths } from "@/components/molecules/bedAndBaths/types";

import Button from "@/components/atoms/button/Button";

const BedAndBaths = ({
  isTitleVisible = true,
  isControlButtonsVisible = true
}: IBedAndBaths) => {
  return (
    <div className="flex flex-col justify-start items-start gap-3">
      {isTitleVisible && (
        <h6 className="text-xl font-mi-sans-semi-bold text-gray-700">
          Bed & Bats
        </h6>
      )}
      <div>
        <span className="text-gray-600 text-lg">Bathrooms</span>
        <div className="flex gap-2 lg:gap-3 items-center">
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            Any
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            1
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            2
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            3
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            4
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            {"4'ten fazla"}
          </div>
        </div>
      </div>
      <div>
        <span className="text-gray-600 text-lg">Beds</span>
        <div className="flex gap-2 lg:gap-3 items-center">
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            Any
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            1
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            2
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            3
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            4
          </div>
          <div className="text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] px-3 cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700">
            {"4'ten fazla"}
          </div>
        </div>
      </div>
      {isControlButtonsVisible && (
        <div className="flex justify-end w-full">
          <Button
            onClick={() => console.log("clear")}
            variant="btn-link"
            className="text-primary bg-transparent shadow-none border-none">
            Clear
          </Button>
          <Button className="ml-2" variant="btn-primary">
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default BedAndBaths;
