import classNames from "classnames";
import { IIndicator } from "@/components/atoms/indicator/types";

const Indicator = ({ size = 1, className = "" }: IIndicator) => {
  const indicatorClass = classNames(`rounded-full ${className}`, {
    "w-1 h-1": size === 1,
    "w-2 h-2": size === 2,
    "w-3 h-3": size === 3
  });

  return <div className={indicatorClass}></div>;
};

export default Indicator;
