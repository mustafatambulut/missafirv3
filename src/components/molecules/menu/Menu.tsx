import { get, map, size } from "lodash";

import SubMenu from "@/components/atoms/subMenu/SubMenu";
import { IMenu } from "@/components/molecules/menu/types";
import MenuItem from "@/components/atoms/menuItem/MenuItem";

const Menu = ({
  links,
  className = "",
  isCollapsable,
  variant = "default"
}: IMenu) => {
  return (
    <ul
      className={`menu lg:flex-1 lg:flex lg:justify-between p-0 ${className}`}>
      {map(links, (link, key) => {
        return size(get(link, "attributes.children.data")) ? (
          <SubMenu
            variant={variant}
            isCollapsable={isCollapsable}
            name={get(link, "attributes.title")}
            items={get(link, "attributes.children.data")}
            key={key}
          />
        ) : (
          <MenuItem
            key={key}
            variant={variant}
            item={get(link, "attributes")}
          />
        );
      })}
    </ul>
  );
};
export default Menu;
