import { get } from "lodash";
import { components } from "react-select";

import { ISelectMenu } from "@/components/atoms/selectMenu/types";

const SelectMenu = ({ ...props }: ISelectMenu) => {
  return (
    <components.Menu
      {...props}
      className={`${get(props, "selectProps.menuClassName")}`}>
      {get(props, "children")}
    </components.Menu>
  );
};

export default SelectMenu;
