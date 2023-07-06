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
    <div className="">
      <footer className="footer border-t px-10 pt-20 pb-10 lg:flex">
        <div className="w-full flex flex-col items-center lg:block lg:w-[327px] ">
          <a href="/">
            <Image
              src="/images/missafir-logo-black.svg"
              alt="Logo"
              width={172}
              height={32}
            />
          </a>
          <p className="my-3 text-center lg:text-left text-base font-missafir-semi-bold text-gray-600">
            Lorem ipsum dolor sit amet. Et saepe omnis sit architecto repellat
            qui culpa nihil sit impedit
          </p>
          <Button
            variant="btn-primary"
            leftIcon={<HeartIcon className="fill-white" />}>
            <span>Become a homeowner</span>
          </Button>
          <div className="flex justify-between w-full lg:w-3/4 mt-8">
            <a href="#" className="rounded-full bg-gray-50 p-1">
              <FacebookIcon className="m-0" />
            </a>
            <a href="#" className="rounded-full bg-gray-50 p-1">
              <InstagramIcon />
            </a>
            <a href="#" className="rounded-full bg-gray-50 p-1">
              <LinkedinIcon />
            </a>
            <a href="#" className="rounded-full bg-gray-50 p-1">
              <TwitterIcon />
            </a>
            <a href="#" className="rounded-full bg-gray-50 p-1">
              <YoutubeIcon />
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:pl-14">
          <Menu variant="footer" isCollapsable={false} links={dummyMenuItems} />
        </div>
      </footer>
      <FooterBrand className="flex justify-between bg-gray-400 text-white text-xs" />
    </div>


};

export default Footer;
