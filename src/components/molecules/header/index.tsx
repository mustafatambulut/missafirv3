import { get } from "lodash";

import {
  HEADER_MENU,
  PAGE_HEADER
} from "@/components/molecules/header/constants";
import { getMenuByComponent, getPageDataByComponent } from "@/utils/helper";

import Menu from "@/components/molecules/menu";

const Header = async ({ currentPage }: string) => {
  const links = await getMenuByComponent(HEADER_MENU);
  const data = await getPageDataByComponent(currentPage, PAGE_HEADER);

  return (
    <div className="p-4 flex justify-between bg-yellow-200">
      <div>
        <img
          width={200}
          src={`${process.env.API_URL_DEV}${get(
            get(data, "logo"),
            "data.attributes.url"
          )}`}
          alt="image"
        />
      </div>
      <Menu links={links} />
    </div>
  );
};
export default Header;
