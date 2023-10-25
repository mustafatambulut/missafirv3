"use client";
import { useState } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { IDropDown } from "@/components/atoms/dropDown/types";

import ArrowUp from "../../../../public/images/up_arrow.svg";
import UserLight from "../../../../public/images/user_light.svg";
import UserDark from "../../../../public/images/user_dark.svg";
import ArrowDown from "../../../../public/images/down_arrow.svg";
import Typography from "../typography/Typography";

const DropDown = ({
  variant = "",
  label,
  children,
  className = "",
  menuClass = "",
  isScrolledHeaderActive
}: IDropDown) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const menuClassName = classNames(
    `dropdown-content z-50 menu p-2 mt-2 shadow bg-base-100 rounded-xl w-52 scale-100 ${menuClass}`,
    {
      "visible opacity-100": isShow
    }
  );

  const labelClass = classNames("text-lg", {
    "text-black": variant === "light",
    "text-white": variant === "dark"
  });

  const handleOutsideClick = () => setIsShow(false);

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className={`dropdown ${className}`}>
        <div
          onClick={() => setIsShow(!isShow)}
          className="flex cursor-pointer items-center gap-x-2">
          <label className="btn btn-ghost btn-circle avatar w-auto">
            <div className="flex justify-center items-center">
              {/*<Image*/}
              {/*  alt="user"*/}
              {/*  width={24}*/}
              {/*  height={24}*/}
              {/*  src={`${imageSrc || "/images/user_light.svg"}`}*/}
              {/*  className="rounded-full bg-gray-100 p-1 lg:bg-transparent lg:p-0"*/}
              {/*/>*/}
              {variant === "light" && isScrolledHeaderActive ? (
                <div className="rounded-full w-6 h-6 bg-gray-50 flex justify-center items-center">
                  <UserDark className="fill-gray-400" />
                </div>
              ) : (
                <div className="rounded-full w-6 h-6 flex justify-center items-center border border-gray-800">
                  <UserDark className="fill-gray-800" />
                </div>
              )}
            </div>
          </label>
          <div className={labelClass}>
            <Typography element="span" variant="p3">
              {label}
            </Typography>
          </div>
          {isShow ? (
            <ArrowUp
              className={variant === "light" ? "fill-gray-600" : "fill-white"}
            />
          ) : (
            <ArrowDown
              className={variant === "light" ? "fill-gray-600" : "fill-white"}
            />
          )}
        </div>
        {isShow ? (
          <ul className={menuClassName} onClick={handleOutsideClick}>
            <Typography element="span" variant="p3">
              {children}
            </Typography>
          </ul>
        ) : null}
      </div>
    </OutsideClickHandler>
  );
};

export default DropDown;
