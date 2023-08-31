"use client";
import { useEffect, useRef } from "react";
import { get } from "lodash";
import classNames from "classnames";

import { IRadio } from "@/components/atoms/radio/types";

const Radio = ({
  name,
  value,
  label,
  checked,
  onChange,
  position,
  isDisable,
  className = "",
  customFilledRadio = false
}: IRadio) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!get(leftRef, "current") && !get(rightRef, "current")) return;
    position === "right"
      ? (leftRef.current.innerText = "")
      : (rightRef.current.innerText = "");
  }, [leftRef, rightRef]);

  const radioClass = classNames({
    "text-base font-mi-sans-semi-bold flex items-center justify-center border rounded-3xl min-w-[36px] h-[36px] cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 text-gray-700":
      customFilledRadio,
    "form-control w-fit font-mi-sans": !customFilledRadio,
    "bg-primary border-primary": customFilledRadio && checked
  });

  const inputClass = classNames(`${className}`,{
    hidden: customFilledRadio
  });

  const labelClass = classNames("cursor-pointer", {
    "label-text label gap-x-2 ": !customFilledRadio,
    "hover:text-white w-full h-full flex items-center justify-center px-3":
      customFilledRadio,
    "text-white": customFilledRadio && checked
  });

  return (
    <div className={radioClass}>
      <label className={labelClass}>
        <span ref={leftRef}>{label}</span>
        <input
          name={name}
          value={value}
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={isDisable}
          className={`radio ${inputClass}`}
        />
        <span ref={rightRef}>{label}</span>
      </label>
    </div>
  );
};

export default Radio;
