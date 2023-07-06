import Image from "next/image";
import { get } from "lodash";

import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { IHeader } from "@/components/molecules/header/types";
import { HEADER } from "@/components/molecules/header/constants";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = async () => {
  const { logo, buttons, languageMenu, userMenu } =
    (await getPageDataByComponent(HOME, HEADER)) as IHeader;

  return (
    <div className="fixed top-0 w-full">
      <Navbar navbarItems={dummyNavbarItems} />
    </div>
  );
};
export default Header;
