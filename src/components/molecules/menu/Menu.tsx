import { get, map, size } from "lodash";

import { IMenu } from "@/components/molecules/menu/types";
import MenuItem from "@/components/atoms/menuItem/MenuItem";
import SubMenu from "@/components/atoms/subMenu/SubMenu";

const Menu = ({
  isCollapsable,
  links,
  className = "",
  variant = "default"
}: IMenu) => {
  return (
    <ul
      className={`menu lg:menu-horizontal lg:flex-1 lg:flex lg:justify-between bg-white p-0 ${className}`}>
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
          <MenuItem variant={variant} key={key} item={get(link, "attributes")} />
        );
      })}
    </ul>
  );
};
export default Menu;
