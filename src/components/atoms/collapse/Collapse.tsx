"use client";
import { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { ICollapse } from "@/components/atoms/collapse/types";

import UpArrow from "../../../../public/images/up_arrow.svg";
import DownArrow from "../../../../public/images/down_arrow.svg";

const Collapse = ({
  title,
  children,
  titleClass,
  contentClass,
  className = "",
  arrowColor = "fill-black"
}: ICollapse) => {
  const collapseRef = useRef<HTMLInputElement>(null);
  const [collapsable, setCollapsable] = useState<boolean>(false);

  const IconComponent = () => {
    return collapsable ? (
      <UpArrow className={arrowColor} />
    ) : (
      <DownArrow className={arrowColor} />
    );
  };

  const ContentComponent = () => {
    return (
      collapsable && (
        <div className={`p-0 collapse-content ${contentClass}`}>{children}</div>
      )
    );
  };

  const handleOutsideClick = () => setCollapsable(false);

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div tabIndex={0} className={`collapse ${className}`}>
        <div
          ref={collapseRef}
          onClick={() => setCollapsable(!collapsable)}
          className={`p-0 collapse-title items-center cursor-pointer flex justify-between min-h-0 ${titleClass}`}>
          {title}
          <IconComponent />
        </div>
        <ContentComponent />
      </div>
    </OutsideClickHandler>
  );
};
export default Collapse;
