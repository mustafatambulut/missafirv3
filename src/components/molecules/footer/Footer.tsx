import Link from "next/link";
import Image from "next/image";
import { get } from "lodash";

import { HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { IFooter } from "@/components/molecules/footer/types";
import { FOOTER } from "@/components/molecules/footer/constant";

import Button from "@/components/atoms/button/Button";
import SocialMenu from "@/components/atoms/socialMenu/SocialMenu";
import FooterMenu from "@/components/molecules/footerMenu/FooterMenu";
import FooterBrand from "@/components/atoms/footerBrand/FooterBrand";

const Footer = async () => {
  const { header, body, footer } = (await getPageDataByComponent(
    HOME,
    FOOTER
  )) as IFooter;
  return (
    <div className="bottom-0 fixed w-full">
      <footer className="footer border-t px-10 pt-20 pb-10 lg:flex">
        <div className="w-full flex flex-col items-center lg:block lg:w-[327px] ">
          <Link href="/">
            <Image
              priority
              src={get(header, "image")}
              width={172}
              height={32}
              className="w-auto h-auto"
              alt="logo"
            />
          </Link>
          <p className="my-3 text-center lg:text-left text-base font-mi-semi-bold text-gray-600">
            {get(header, "description")}
          </p>
          <Button
            isRtl={false}
            variant="btn-primary"
            link={get(header, "buttonLink")}>
            <Image
              priority
              src={get(header, "buttonImage")}
              width="0"
              height="0"
              className="w-5 h-auto"
              alt="image"
            />
            <span>{get(header, "buttonLabel")}</span>
          </Button>
          <SocialMenu links={get(footer, "footer_links.data")} />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:pl-14">
          <FooterMenu items={body} />
        </div>
      </footer>
      <FooterBrand className="flex justify-between bg-gray-400 text-white text-xs" />
    </div>
  );
};

export default Footer;
