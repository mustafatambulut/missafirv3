"use client";
import { useEffect, useRef } from "react";
import classNames from "classnames";
import { get, includes, split } from "lodash";

import { IInput } from "@/components/atoms/input/types";

const Input = ({
                 name,
                 value,
                 label,
                 leftIcon,
                 rightIcon,
                 onChange,
                 type = "text",
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

  const inputContainerClass = classNames("flex rounded-lg items-center", {
    "bg-gray-100": isDisable,
    "border border-gray-300": !isDisable,
    "px-2": !!leftIcon
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
          type={type}
          name={name}
          value={value}
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
