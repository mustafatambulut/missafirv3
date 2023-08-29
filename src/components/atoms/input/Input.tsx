"use client";
import { useEffect, useRef } from "react";
import classNames from "classnames";
import { get, includes, split } from "lodash";

const Input = ({ ...props }: any) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);
  const {
    label,
    isDisable,
    lefticon,
    righticon,
    position,
    className,
    containerclass
  } = props;

  const labelContainerClass = classNames("label", {
    "order-1": includes(split(position, "-"), "bottom"),
    hidden: !label
  });

  const inputContainerClass = classNames(
    `flex rounded-lg bg-white items-center`,
    {
      "bg-gray-100": isDisable,
      "border border-gray-200": !isDisable,
      "px-2": !!lefticon
    }
  );

  useEffect(() => {
    if (!get(leftRef, "current") && !get(rightRef, "current")) return;

    includes(split(position, "-"), "right")
      ? (leftRef.current.innerText = "")
      : (rightRef.current.innerText = "");
  }, [leftRef, rightRef]);

  return (
    <div className={`form-control flex w-full font-mi-sans ${containerclass}`}>
      <label className={labelContainerClass}>
        <span ref={leftRef}>{label}</span>
        <span ref={rightRef}>{label}</span>
      </label>
      <div className={inputContainerClass}>
        {lefticon}
        <input
          {...props}
          className={`input focus:outline-0 w-full text-gray-800 ${className}`}
        />
        {righticon}
      </div>
    </div>
  );
};

export default Input;
