import classNames from "classnames";
import { get, has, size } from "lodash";
import { components } from "react-select";

import { IDropdownIndicator } from "@/components/atoms/dropdownIndicator/types";
import DownArrow from "../../../../public/images/chevron_down.svg";

const DropdownIndicator = ({ props, showIndicator }: IDropdownIndicator) => {
  const checkIsCustomColor = (which: string) => {
    if (size(props.getValue()) > 0) {
      const selectedValue = get(props.getValue()[0], "attributes");
      if (has(selectedValue, "type")) {
        return selectedValue.type === "filter" && selectedValue.value === which;
      }
    }
  };
  const dropdownIndicatorClass = classNames("fill-gray", {
    "fill-gray": checkIsCustomColor("all"),
    "fill-warning-yellow": checkIsCustomColor("pending"),
    "fill-error-red": checkIsCustomColor("cancelled"),
    "fill-success-green": checkIsCustomColor("confirmed")
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
