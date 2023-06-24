import { get, map, size } from "lodash";

import { IMenu } from "@/components/molecules/menu/types";

import MenuItem from "@/components/atoms/menuItem";
import SubMenu from "@/components/atoms/subMenu";

const Menu = ({ isCollapsable, links, className = "" }: IMenu) => {
  return (
    <ul
      className={`menu lg:menu-horizontal lg:flex-1 lg:flex lg:justify-between bg-white p-0 ${className}`}>
      {map(links, (link, key) => {
        return size(get(link, "attributes.children.data")) ? (
          <SubMenu
            isCollapsable={isCollapsable}
            name={get(link, "attributes.title")}
            items={get(link, "attributes.children.data")}
            key={key}
          />
        ) : (
          <MenuItem key={key} item={get(link, "attributes")} />
        );
      })}
    </ul>
  );
};
export default Menu;
