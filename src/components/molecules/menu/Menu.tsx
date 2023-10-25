import dynamic from "next/dynamic";
import { get, map, size } from "lodash";
import { ILink, IMenu } from "@/components/molecules/menu/types";

const SubMenu: any = dynamic(() => import("@/components/atoms/subMenu/SubMenu"), {
  ssr: false
});

const MenuItem: any = dynamic(() => import("@/components/atoms/menuItem/MenuItem"), {
  ssr: false
});

const Menu = ({
  links,
  isCollapsable,
  className = "",
  subMenuClass = "",
  menuItemClass = "",
  variant = "default"
}: IMenu) => {
  const SubMenuComponent = (link: ILink, key: number) => {
    return (
      <SubMenu
        key={key}
        variant={variant}
        className={subMenuClass}
        isCollapsable={isCollapsable}
        name={get(link, "attributes.title")}
        items={get(link, "attributes.children.data")}
      />
    );
  };

  const MenuItemComponent = (link: ILink, key: number) => {
    return (
      <MenuItem
        key={key}
        variant={variant}
        className={menuItemClass}
        item={get(link, "attributes")}
      />
    );
  };

  return (
    <ul
      className={`menu lg:flex-1 lg:flex lg:justify-between p-0 ${className}`}>
      {map(links, (link, key) => {
        return size(get(link, "attributes.children.data"))
          ? SubMenuComponent(link, key)
          : MenuItemComponent(link, key);
      })}
    </ul>
  );
};
export default Menu;
