"use client";
import { useRef } from "react";
import classNames from "classnames";
import { get, includes, isEmpty, split } from "lodash";

const Input = ({ ...props }: any) => {
  const leftRef = useRef<HTMLInputElement>(null);
  const {
    label,
    isDisable,
    lefticon,
    righticon,
    position = "top-left",
    className,
    containerclass,
    inputcontainerclass,
    labelcontainerclass,
    errormessage = null
  } = props;

  const labelContainerClassName = classNames(
    `label w-full ${labelcontainerclass}`,
    {
      "order-1": includes(split(position, "-"), "bottom"),
      hidden: !label,
      "text-red-500": errormessage,
      "justify-end": includes(split(position, "-"), "right"),
      "justify-start": position === "top-left"
    }
  );

  const inputContainerClassName = classNames(
    `flex rounded-lg bg-white items-center ${inputcontainerclass}`,
    {
      "bg-gray-100": isDisable,
      "border border-gray-200": !isDisable,
      "border border-red-500": !isDisable && errormessage,
      "px-2": !!lefticon
    }
  );

  const inputClassName = classNames("input focus:outline-0 w-full", {
    "placeholder:text-red-500": errormessage,
    [className]: className,
    "text-gray-800": !isEmpty(get(props, "value")),
    "w-full text-sm text-gray-500 block": isEmpty(get(props, "value"))
  });

  return (
    <div className={`form-control flex w-full font-mi-sans ${containerclass}`}>
      <label className={labelContainerClassName}>
        <span ref={leftRef}>{label}</span>
      </label>
      <div className={inputContainerClassName}>
        {lefticon}
        <input {...props} className={inputClassName} />
        {righticon}
      </div>
    </div>
  );
};

export default Input;
