import {
  IFooterBrand,
  FooterBrandProps
} from "@/components/atoms/footerBrand/types";
import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";

const FooterBrand = async ({ className = "" }: FooterBrandProps) => {
  const { header, body } = (await getPageDataByComponent(
    HOME,
    FOOTER_BRAND
  )) as IFooterBrand;

  return (
    <footer className={`footer footer-center p-4 ${className}`}>
      footer brand
    </footer>
  );
};

export default FooterBrand;
