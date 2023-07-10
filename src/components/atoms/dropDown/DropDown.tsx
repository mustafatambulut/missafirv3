import { map } from "lodash";
import { IDropDown } from "@/components/atoms/dropDown/types";

import MenuItem from "@/components/atoms/menuItem/MenuItem";

const DropDown = ({
  name,
  items,
  className = "",
  btnClassName = "",
  menuClassName = ""
}: IDropDown) => {
  // console.log(name);
  return (
    <div className={`dropdown dropdown-hover ${className}`}>
      <label tabIndex={0} className={`cursor-pointer ${btnClassName}`}>
        {name}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${menuClassName}`}>
        {map(items, ({ attributes }, key) => (
          <MenuItem item={attributes} key={key} />
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
