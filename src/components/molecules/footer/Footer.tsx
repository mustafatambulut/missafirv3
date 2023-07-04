import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { IFooter } from "@/components/molecules/footer/types";
import { FOOTER } from "@/components/molecules/footer/constant";

import FooterBrand from "@/components/atoms/footerBrand/FooterBrand";

const Footer = async () => {
  const { header, body, footer } = (await getPageDataByComponent(
    HOME,
    FOOTER
  )) as IFooter;

  return (
    <div className="bottom-0 fixed w-full">
      <footer className="flex h-28 p-3 items-center justify-center bg-indigo-400 text-white"></footer>
      <FooterBrand className="flex justify-between bg-gray-400 text-white text-xs" />
    </div>
  );
};

export default Footer;
