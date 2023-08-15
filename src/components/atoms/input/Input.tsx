"use client";
import { useEffect, useRef } from "react";
import classNames from "classnames";
import { get, includes, split } from "lodash";

import { IInput } from "@/components/atoms/input/types";

const Input = ({
  label,
  leftIcon,
  rightIcon,
  onChange,
  isDisable = false,
  className = "",
  placeholder = "",
  position = "top-left",
  containerClassName = ""
}: IInput) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);

  const labelContainerClass = classNames("label", {
    "order-1": includes(split(position, "-"), "bottom")
  });

  const inputContainerClass = classNames("px-2 flex rounded-lg items-center", {
    "bg-gray-100": isDisable,
    "border border-gray-300": !isDisable
  });

  useEffect(() => {
    if (!get(leftRef, "current") && !get(rightRef, "current")) return;

    includes(split(position, "-"), "right")
      ? (leftRef.current.innerText = "")
      : (rightRef.current.innerText = "");
  }, [leftRef, rightRef]);

  return (
    <div
      className={`form-control flex w-full font-mi-sans ${containerClassName}`}>
      <label className={labelContainerClass}>
        <span ref={leftRef}>{label}</span>
        <span ref={rightRef}>{label}</span>
      </label>
      <div className={inputContainerClass}>
        {leftIcon}
        <input
          type="text"
          onChange={onChange}
          disabled={isDisable}
          placeholder={placeholder}
          className={`input focus:outline-0 w-full text-gray-800 ${className}`}
        />
        {rightIcon}
      </div>
    </div>
  );
};

export default Input;
