import React from "react";

import RangeSlider from "@/components/atoms/rangeSlider/RangeSlider";
import Concepts from "@/components/molecules/concepts/Concepts";
import Amenities from "@/components/molecules/amenities/Amenities";
import BedAndBaths from "@/components/molecules/bedAndBaths/BedAndBaths";

import Button from "@/components/atoms/button/Button";

import "./AllFilters.css";

import CloseIcon from "../../../../public/images/close.svg";

const AllFilters = () => {
  return (
    <dialog id="all_filters_modal" className="modal modal-top md:modal-middle">
      <form
        method="dialog"
        className="p-3 lg:p-5 modal-box lg:w-11/12 lg:max-w-5xl overflow-x-hidden rounded-none lg:rounded-2xl max-h-screen lg:max-h-[calc(100%-5em)]">
        <div className="flex justify-between items-center">
          <div className="text-primary-600 lg:text-gray-700 font-mi-sans-semi-bold text-xl lg:text-2xl">
            <span className="hidden lg:inline-block">All</span>
            <span>Filters</span>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost">
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-between">
            <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
              Your Selections
            </div>
            <div className="text-base lg:text-lg text-gray-700 cursor-pointer">
              Clear All
            </div>
            {/*!TODO: Redux bağlanınca selections eklenecek*/}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
                Bed & Baths
              </div>
            </div>
            <BedAndBaths
              isTitleVisible={false}
              isControlButtonsVisible={false}
            />
          </div>
          <div className="flex flex-col lg:w-96 gap-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
                Price Range
              </div>
            </div>
            <RangeSlider isTitleVisible={false} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
                Concepts
              </div>
            </div>
            <Concepts isInAllFilters={true} isControlButtonsVisible={false} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 lg:text-gray-800 font-mi-sans-semi-bold text-lg lg:text-2xl">
                Amenities
              </div>
            </div>
            <Amenities />
          </div>
        </div>

        <div className="modal-action">
          <div className="flex justify-end w-full">
            <Button
              onClick={() => console.log("cancel")}
              variant="btn-link"
              className="text-primary bg-transparent shadow-none border-none">
              Cancel
            </Button>
            <Button className="ml-2" variant="btn-primary">
              Apply
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default AllFilters;
