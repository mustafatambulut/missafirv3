import { get } from "lodash";
import { components } from "react-select";

import { IDropdownIndicator } from "@/components/atoms/dropdownIndicator/types";

const DropdownIndicator = ({ props, showIndicator }: IDropdownIndicator) => {
  return (
    <>
      {showIndicator && (
        <components.DropdownIndicator {...props}>
          {get(props, "children")}
        </components.DropdownIndicator>
      )}
    </>
  );
};

export default DropdownIndicator;
