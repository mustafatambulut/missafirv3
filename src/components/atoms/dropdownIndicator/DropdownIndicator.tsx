import { get } from "lodash";
import classNames from "classnames";
import { components } from "react-select";

import { checkIsCustomColor } from "@/utils/helper";
import { IDropdownIndicator } from "@/components/atoms/dropdownIndicator/types";

import DownArrow from "../../../../public/images/chevron_down.svg";

const DropdownIndicator = ({ props, showIndicator }: IDropdownIndicator) => {
  const selectedValue = get(props.getValue(), "0.attributes");
  const type = get(selectedValue, "type");

  const dropdownIndicatorClass = classNames({
    "fill-gray":
      (type === "filter" && checkIsCustomColor(props, "all")) ||
      type !== "filter",
    "fill-error-red":
      type === "filter" && checkIsCustomColor(props, "cancelled"),
    "fill-warning-yellow":
      type === "filter" && checkIsCustomColor(props, "pending"),
    "fill-success-green":
      type === "filter" && checkIsCustomColor(props, "confirmed")
  });

  return (
    <>
      {showIndicator && (
        <components.DropdownIndicator {...props}>
          <DownArrow className={dropdownIndicatorClass} />
        </components.DropdownIndicator>
      )}
    </>
  );
};

export default DropdownIndicator;
