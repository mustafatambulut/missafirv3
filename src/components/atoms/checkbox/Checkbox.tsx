import { useEffect, useRef } from "react";
import { get } from "lodash";

import { ICheckbox } from "@/components/atoms/checkbox/types";
import classNames from "classnames";

const Checkbox = ({
  name,
  value,
  label,
  checked,
  onChange,
  position = "left",
  isDisable,
  className = "",
  labelClass = "",
  customFilledCheckbox = false
}: ICheckbox) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!get(leftRef, "current") && !get(rightRef, "current")) return;
    position === "right"
      ? (leftRef.current.innerText = "")
      : (rightRef.current.innerText = "");
  }, [leftRef, rightRef]);

  const checkboxClass = classNames(`${className}`, {
    "form-control w-fit font-mi-sans": !customFilledCheckbox,
    "border px-3 py-2 font-mi-sans-semi-bold text-sm rounded-20 cursor-pointer flex items-center justify-center gap-2":
      customFilledCheckbox,
    "bg-primary-100 text-primary border-primary":
      customFilledCheckbox && checked
  });
  const checkboxLabelClass = classNames(`cursor-pointer ${labelClass}`, {
    "label-text label gap-x-2 text-gray-700": !customFilledCheckbox,
    "text-primary-500": customFilledCheckbox && checked
  });
  const checkboxInputClass = classNames(
    `checkbox  checkbox-primary border-gray-300 checked:border-primary ${className}`,
    {
      hidden: customFilledCheckbox
    }
  );

  return (
    <div className={checkboxClass}>
      <label className={checkboxLabelClass}>
        <span
          className={position === "right" ? "hidden" : "block"}
          ref={leftRef}>
          {label}
        </span>
        <input
          name={name}
          value={value}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisable}
          className={checkboxInputClass}
        />
        <span
          className={position === "left" ? "hidden" : "block"}
          ref={rightRef}>
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
