"use client";
import { get } from "lodash";
import classNames from "classnames";

import { ICheckbox } from "@/components/atoms/checkbox/types";

import CheckedIcon from "../../../../public/images/checked.svg";

const Checkbox = ({ data, handleChange, isChecked }: ICheckbox) => {
  const checkboxClass = classNames(
    "border-2 cursor-pointer label justify-start relative border rounded-md w-6 h-6 p-0 select-none",
    {
      "bg-primary-50 !border-primary": isChecked
    }
  );

  const checkboxInnerClass = classNames(
    "flex justify-center items-center w-full h-full"
  );

  const checkboxLabelClass = classNames(
    "label-text ml-2 text-gray-700 text-sm lg:text-base select-none"
  );

  return (
    <label className="flex cursor-pointer">
      <div className={checkboxClass}>
        <input type="checkbox" className="hidden" onChange={handleChange} />
        {isChecked && (
          <div className={checkboxInnerClass}>
            <CheckedIcon />
          </div>
        )}
      </div>
      <span className={checkboxLabelClass}>{get(data, "title")}</span>
    </label>
  );
};

export default Checkbox;
