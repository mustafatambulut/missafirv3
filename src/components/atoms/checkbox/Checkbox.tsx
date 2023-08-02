import React, { useState } from "react";
import classNames from "classnames";

import CheckedIcon from "../../../../public/images/checked.svg";
import { ICheckbox } from "@/components/atoms/checkbox/types";

const Checkbox = ({ label }: ICheckbox) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxClass = classNames(
    "border-2 cursor-pointer label justify-start relative border rounded-md !w-[24px] !h-[24px] p-0 select-none",
    {
      "bg-primary-50 !border-primary": isChecked
    }
  );
  const checkboxInnerClass = classNames(
    "flex justify-center items-center w-full h-full"
  );
  const checkboxLabelClass = classNames(
    "label-text ml-2 text-gray-700 text-sm lg:text-base z-50 select-none"
  );
  return (
    <label className="flex">
      <div className={checkboxClass}>
        <input
          type="checkbox"
          className="hidden"
          onChange={() => setIsChecked((v) => !v)}
        />
        {isChecked && (
          <div className={checkboxInnerClass}>
            <CheckedIcon />
          </div>
        )}
      </div>
      <span className={checkboxLabelClass}>{label}</span>
    </label>
  );
};

export default Checkbox;
