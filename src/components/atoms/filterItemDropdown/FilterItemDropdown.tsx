import { cloneElement } from "react";

import { IDropdown } from "@/components/molecules/filterItem/types";

const FilterItemDropdown = ({
  children,
  isDropdownOpen,
  setIsDropdownOpen
}: IDropdown) => {
  return (
    <>
      {isDropdownOpen && children !== null && (
        <div
          tabIndex={0}
          className="dropdown-content z-20 menu p-4 lg:shadow-[0px_1px_20px_0px_#00000014] bg-white lg:rounded-lg min-w-[100vw] lg:min-w-min absolute left-[-1.25rem] mt-3 lg:left-auto">
          {cloneElement(children, {
            isDropdownOpen,
            setIsDropdownOpen
          })}
        </div>
      )}
    </>
  );
};

FilterItemDropdown.displayName = "Dropdown";

export default FilterItemDropdown;
