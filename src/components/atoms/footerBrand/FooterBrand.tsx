import { get } from "lodash";

import {
  IFooterBrand,
  FooterBrandProps
} from "@/components/atoms/footerBrand/types";
import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";

import Menu from "@/components/molecules/menu/Menu";

const FooterBrand = async ({ className = "" }: FooterBrandProps) => {
  const { header, body } = (await getPageDataByComponent(
    HOME,
    FOOTER_BRAND
  )) as IFooterBrand;

  return (
    <footer className={`footer footer-center p-4 ${className}`}>
      <div className="flex">
        {get(header, "title")}
        <p>{get(header, "description")}</p>
      </div>
      <div>
        <Menu
          className="flex-row"
          isCollapsable={false}
          links={get(body, "brand_links.data")}
        />
      </div>
    </footer>
  );
};

export default FooterBrand;
