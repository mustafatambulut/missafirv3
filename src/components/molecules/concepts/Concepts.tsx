import React from "react";
import classNames from "classnames";

import Button from "@/components/atoms/button/Button";
import BuildingIcon from "../../../../public/images/building.svg";
import { IConcepts } from "@/components/molecules/concepts/types";

const Concepts = ({
  isInAllFilters = false,
  isControlButtonsVisible = true
}: IConcepts) => {
  const itemClass = classNames(
    "border px-3 py-2 text-gray-700 font-mi-sans-semi-bold text-sm rounded-[20px] cursor-pointer flex items-center gap-2",
    {
      "bg-gray-50 !py-8 border-none !rounded-xl flex-col items-center justify-center":
        isInAllFilters
    }
  );
  return (
    <div className="flex flex-wrap gap-3 max-w-[665px] grid-cols-3">
      <div className={itemClass}>
        <BuildingIcon /> <span>Conservative</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon /> <span>Friendly</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon /> <span>Infant Friendly</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon />
        <span>Special Concept</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon /> <span>Business Friendly</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon />
        <span>Luxury Villas</span>
      </div>
      <div className={itemClass}>
        <BuildingIcon />
        <span>VIP</span>
      </div>
      {isControlButtonsVisible && (
        <div className="flex justify-end w-full">
          <Button
            onClick={() => console.log("clear")}
            variant="btn-link"
            className="text-primary bg-transparent shadow-none border-none">
            Close
          </Button>
          <Button className="ml-2" variant="btn-primary">
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default Concepts;
