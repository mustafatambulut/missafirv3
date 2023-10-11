"use client";
import { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { ICollapse } from "@/components/atoms/collapse/types";

import UpArrow from "../../../../public/images/up_arrow.svg";
import DownArrow from "../../../../public/images/down_arrow.svg";
import classNames from "classnames";

const Collapse = ({
  title,
  children,
  titleClass,
  contentClass,
  className = "",
  arrowColor = "fill-black",
  closeOnOutsideClick = true,
  showArrowIcon = true,
  titlePlacement = "justify-between"
}: ICollapse) => {
  const collapseRef = useRef<HTMLInputElement>(null);
  const [collapsable, setCollapsable] = useState<boolean>(false);

  const titleClassName = classNames(
    `p-0 collapse-title items-center cursor-pointer flex min-h-0 ${titleClass}`,
    {
      [titlePlacement]: titlePlacement
    }
  );
  const IconComponent = () => {
    return collapsable ? (
      <UpArrow className={arrowColor} />
    ) : (
      <DownArrow className={arrowColor} />
    );
  };

  const ContentComponent = () => {
    return (
      <div
        className={`p-0 ${
          collapsable && "mt-2"
        } collapse-content ${contentClass}`}>
        {children}
      </div>
    );
  };

  const handleOutsideClick = () => {
    if (closeOnOutsideClick && collapseRef.current) {
      collapseRef.current.checked = false;
      setCollapsable(false);
    }
  };

  const handleCollapseChange = () => {
    setCollapsable((v) => !v);
  };
  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className={`collapse ${className}`}>
        <input
          ref={collapseRef}
          type="checkbox"
          className="peer min-h-0"
          onChange={(e) => handleCollapseChange(e)}
        />
        <div className={titleClassName}>
          {title}
          {showArrowIcon && <IconComponent />}
        </div>
        <ContentComponent />
      </div>
    </OutsideClickHandler>
  );
};
export default Collapse;
