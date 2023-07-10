import { get, map, size } from "lodash";

import { IMenu } from "@/components/molecules/menu/types";

import SubMenu from "@/components/atoms/subMenu/SubMenu";
import MenuItem from "@/components/atoms/menuItem/MenuItem";

const Menu = ({
  links,
  isCollapsable,
  className = "",
  subMenuClass = "",
  menuItemClass = "",
  variant = "default"
}: IMenu) => {
  return (
    <ul
      className={`menu lg:flex-1 lg:flex lg:justify-between p-0 ${className}`}>
      {map(links, (link, key) => {
        return size(get(link, "attributes.children.data")) ? (
          <SubMenu
            key={key}
            variant={variant}
            className={subMenuClass}
            isCollapsable={isCollapsable}
            name={get(link, "attributes.title")}
            items={get(link, "attributes.children.data")}
          />
        ) : (
          <MenuItem
            key={key}
            variant={variant}
            className={menuItemClass}
            item={get(link, "attributes")}
          />
        );
      })}
    </ul>
  );
};
export default Menu;
