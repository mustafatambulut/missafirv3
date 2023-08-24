"use client";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import OutsideClickHandler from "react-outside-click-handler";
import { compact, filter, includes, size, split } from "lodash";

import { LOCALES } from "@/app/constants";
import { IDropDown } from "@/components/atoms/dropDown/types";

import ArrowUp from "../../../../public/images/up_arrow.svg";
import ArrowDown from "../../../../public/images/down_arrow.svg";

const DropDown = ({
  label,
  children,
  imageSrc = "",
  className = "",
  menuClass = "",
  isScrolledHeaderActive
}: IDropDown) => {
  const pathName = usePathname();
  const [isShow, setIsShow] = useState<boolean>(false);
  const menuClassName = classNames(
    `dropdown-content z-50 menu p-2 mt-2 shadow bg-base-100 rounded-xl w-52 ${menuClass}`,
    {
      "visible opacity-100": isShow
    }
  );

  const isHomePage = !size(
    filter(compact(split(pathName, "/")), (item) => {
      if (!includes(LOCALES, item)) return item;
    })
  );

  const labelClass = classNames("text-lg", {
    "text-black": isScrolledHeaderActive,
    "text-white": !isScrolledHeaderActive && isHomePage
  });

  const handleOutsideClick = () => setIsShow(false);

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className={`dropdown ${className}`}>
        <div
          onClick={() => setIsShow(!isShow)}
          className="flex cursor-pointer items-center gap-x-2">
          <label className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user"
                width={24}
                height={24}
                src={`${imageSrc || "/images/user_light.svg"}`}
                className="rounded-full bg-gray-100 p-1 lg:bg-transparent lg:p-0"
              />
            </div>
          </label>
          <div className={labelClass}>{label}</div>
          {isShow ? (
            <ArrowUp className="fill-gray-600" />
          ) : (
            <ArrowDown className="fill-gray-600" />
          )}
        </div>
        <ul className={menuClassName}>{children}</ul>
      </div>
    </OutsideClickHandler>
  );
};

export default DropDown;
