import classNames from "classnames";
import { components } from "react-select";

import { IDropdownIndicator } from "@/components/atoms/dropdownIndicator/types";
import DownArrow from "../../../../public/images/chevron_down.svg";
import { checkIsCustomColor } from "@/utils/helper";

const DropdownIndicator = ({ props, showIndicator }: IDropdownIndicator) => {
  const dropdownIndicatorClass = classNames("fill-gray", {
    "!fill-gray": checkIsCustomColor(props, "all"),
    "!fill-warning-yellow": checkIsCustomColor(props, "pending"),
    "!fill-error-red": checkIsCustomColor(props, "cancelled"),
    "!fill-success-green": checkIsCustomColor(props, "confirmed")
  });

  return (
    <>
      {showIndicator && (
        <components.DropdownIndicator {...props}>
          <DownArrow className={`fill-gray ${dropdownIndicatorClass}`} />
        </components.DropdownIndicator>
      )}
    </>
  );
};

export default DropdownIndicator;
