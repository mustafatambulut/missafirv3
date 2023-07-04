import Image from "next/image";
import { get } from "lodash";

import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { IHeader } from "@/components/molecules/header/types";
import { HEADER } from "@/components/molecules/header/constants";

const Header = async () => {
  const { logo, buttons, languageMenu, userMenu } =
    (await getPageDataByComponent(HOME, HEADER)) as IHeader;

  return (
    <div className="p-4 flex justify-between bg-yellow-200">
      <Image
        src={get(logo, "image")}
        width="0"
        height="0"
        priority
        className="w-40 h-auto"
        alt="missafir-logo"
      />
    </div>
  );
};
export default Header;
