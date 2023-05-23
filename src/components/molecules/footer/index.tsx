import { find, get, map } from "lodash";

import { getMenu, getPage } from "@/service";
import { getMenuByComponent } from "@/utils/helper";
import { FOOTER_MENU } from "@/components/molecules/footer/constant";
import Menu from "@/components/molecules/menu";
import SubFooter from "@/components/atoms/subFooter";

const Footer = async () => {
  const links = await getMenuByComponent(FOOTER_MENU);

  return (
    <div className="bottom-0 fixed w-full">
      <footer className="flex h-28 p-3 items-center justify-center bg-indigo-400 text-white">
        <Menu links={links} />
      </footer>
      <SubFooter className="flex justify-between bg-gray-400 text-white text-xs" />
    </div>
  );
};

export default Footer;
