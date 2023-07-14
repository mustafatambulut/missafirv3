import { get } from "lodash";
import { components } from "react-select";

import { ISelectMenu } from "@/components/atoms/selectMenu/types";

const SelectMenuList = ({ ...props }: ISelectMenu) => {
  return (
    <components.MenuList
      {...props}
      className={`${get(props, "selectProps.menuClassName")}`}>
      <div>{get(props, "children")}</div>
    </components.MenuList>
  );
};

export default SelectMenuList;
