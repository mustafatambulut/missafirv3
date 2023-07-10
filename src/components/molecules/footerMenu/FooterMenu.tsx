import { get, map } from "lodash";

import { IFooterMenu } from "@/components/molecules/footerMenu/types";

import Menu from "@/components/molecules/menu/Menu";

const FooterMenu = ({ items, className = "" }: IFooterMenu) => {
  return (
    <>
      {map(items, (menu, key) => (
        <div className={className} key={key}>
          <h1 className="text-lg uppercase font-black">{get(menu, "title")}</h1>
          <Menu
            variant="footer"
            isCollapsable={false}
            className="text-gray-500"
            links={get(menu, "menu_links.data")}
          />
        </div>
      ))}
    </>
  );
};

export default FooterMenu;
