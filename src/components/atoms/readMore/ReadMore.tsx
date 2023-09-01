"use client";
import { ReactNode, useState } from "react";
import classNames from "classnames";

import { IReadMore } from "@/components/atoms/readMore/types";

import DowArrowPrimary from "../../../../public/images/chevron_down.svg";

const ReadMore = ({
  type,
  children,
  className = "",
  bodyClass = "",
  showLabel = "Read more",
  lessLabel = "Show less"
}: IReadMore) => {
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  const bodyClassName = classNames(
    `flex flex-wrap w-1/2 gap-2 overflow-hidden h-32 ${bodyClass}`,
    { "overflow-visible h-auto": !isReadMore }
  );

  const indicatorClass = classNames("fill-primary", {
    "rotate-180": !isReadMore
  });

  const toggleReadMore = () => setIsReadMore(!isReadMore);

  const ChildrenComponent = (): ReactNode => {
    const text = children;

    if (type === "text") {
      return (
        <p className="w-full">
          {isReadMore ? `${text.slice(0, 150)}...` : text}
        </p>
      );
    }

    return <div className={bodyClassName}>{children}</div>;
  };

  return (
    <div className={`${className}`}>
      <ChildrenComponent />
      <div className="mt-2">
        <span onClick={toggleReadMore} className="cursor-pointer text-primary">
          <span className="inline-flex items-center gap-x-2">
            {isReadMore ? showLabel : lessLabel}
            <DowArrowPrimary className={indicatorClass} />
          </span>
        </span>
      </div>
    </div>
  );
};

export default ReadMore;
