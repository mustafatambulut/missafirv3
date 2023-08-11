"use client";
import { useState } from "react";
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
        <div className={`collapse-content ${contentClass}`}>{children}</div>
      )
    );
  };

  return (
    <div tabIndex={0} className={`collapse  ${className}`}>
      <div
        onClick={() => setCollapsable(!collapsable)}
        className={`collapse-title flex justify-between min-h-0 ${titleClass}`}>
        {title}
        <IconComponent />
      </div>
      <ContentComponent />
    </div>
  );
};
export default Collapse;
