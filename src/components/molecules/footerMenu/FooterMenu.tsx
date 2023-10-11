import { get, map } from "lodash";

import { IFooterMenu } from "@/components/molecules/footerMenu/types";

import Menu from "@/components/molecules/menu/Menu";
import Typography from "@/components/atoms/typography/Typography";

const FooterMenu = ({ items, className = "" }: IFooterMenu) => {
  return (
    <>
      {map(items, (menu, key) => (
        <div className={className} key={key}>
          <Typography variant="p6" element="p" className="uppercase font-gray-800 font-bariol-bold">{get(menu, "title")}</Typography>
          <Menu
            variant="footer"
            isCollapsable={false}
            className="gap-y-3"
            menuItemClass="text-base font-mi-sans-semi-bold text-gray-500"
            links={get(menu, "menu_links.data")}
          />
        </div>
      ))}
    </>
  );
};

export default FooterMenu;
