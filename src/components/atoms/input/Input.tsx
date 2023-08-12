"use client";
import { useEffect, useRef } from "react";
import classNames from "classnames";
import { get, includes, split } from "lodash";

import { IInput } from "@/components/atoms/input/types";

const Input = ({
  label,
  leftIcon,
  rightIcon,
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
      <div className="px-2 flex border border-gray-300 rounded-lg items-center">
        {leftIcon}
        <input
          type="text"
          placeholder={placeholder}
          className={`input focus:outline-0 w-full text-gray-800 ${className}`}
        />
        {rightIcon}
      </div>
    </div>
  );
};

export default Input;
