import { get, map, size } from "lodash";

import { IMenu } from "@/components/molecules/menu/types";

import DropDown from "@/components/atoms/dropDown";
import MenuItem from "@/components/atoms/MenuItem";

const Menu = ({ links, className = "" }: IMenu) => {
  return (
    <ul className={`flex flex-row gap-x-2 ${className}`}>
      {map(links, (link, key) => {
        return size(get(link, "attributes.children.data")) ? (
          <DropDown
            btnClassName="p-3 rounded-xl active:bg-yellow-300 hover:bg-yellow-100"
            name={get(link, "attributes.title")}
            items={get(link, "attributes.children.data")}
            key={key}
          />
        ) : (
          <MenuItem
            item={get(link, "attributes")}
            className="p-3 rounded-xl active:bg-yellow-300 hover:bg-yellow-100"
          />
        );
      })}
    </ul>
  );
};
export default Menu;
