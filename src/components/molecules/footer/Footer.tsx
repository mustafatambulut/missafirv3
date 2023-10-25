"use client";
import Link from "next/link";
import Image from "next/image";
import { get, isEmpty } from "lodash";

// import { isValidUrl } from "@/utils/helper";
import useFetchData from "@/app/hooks/useFetchData";
import { FOOTER } from "@/components/molecules/footer/constant";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import SocialMenu from "@/components/atoms/socialMenu/SocialMenu";
import FooterBrand from "@/components/atoms/footerBrand/FooterBrand";
import FooterMenu from "@/components/molecules/footerMenu/FooterMenu";
import FooterSkeleton from "@/components/molecules/skeletons/footerSkeleton/FooterSkeleton";
import { useAppSelector } from "@/redux/hooks";

const Footer = ({ lang }: { lang: string }) => {
  //const data = useFetchData(FOOTER);
  const data = useAppSelector((state) => state.landingReducer.footerData);

  return (
    <div>
      <footer className="bg-white relative z-20 lg:z-0 footer border-t border-gray-100 px-4 lg:px-10 pt-10 mt-10 lg:pt-20 pb-10 lg:flex">
        <div className="flex flex-col items-center lg:block w-full lg:w-[24%]">
          {/*<Link href="/">*/}
          {/*  {get(data, "header.image") &&*/}
          {/*    // isValidUrl(get(data, "header.image")) && (*/}
          {/*    //   <Image*/}
          {/*    //     priority*/}
          {/*    //     src={get(data, "header.image")}*/}
          {/*    //     width="0"*/}
          {/*    //     height="0"*/}
          {/*    //     alt="logo"*/}
          {/*    //     className="w-40 lg:w-52 h-auto"*/}
          {/*    //   />*/}
          {/*    // )}*/}
          {/*</Link>*/}
          <Typography
            variant="p4"
            element="p"
            className="my-6 text-center lg:text-left text-gray-600">
            {get(data[lang], "header.description")}
          </Typography>
          {get(data[lang], "header.buttonImage") && (
            <Button
              isRtl={false}
              variant="btn-primary"
              link={get(data[lang], "header.buttonLink")}>
              {/*{isValidUrl(get(data, "header.buttonImage")) && (*/}
              {/*  <Image*/}
              {/*    priority*/}
              {/*    src={get(data, "header.buttonImage")}*/}
              {/*    width="0"*/}
              {/*    height="0"*/}
              {/*    className="w-5 h-auto"*/}
              {/*    alt="image"*/}
              {/*  />*/}
              {/*)}*/}
              <Typography variant="p3" element="span">
                {get(data[lang], "header.buttonLabel")}
              </Typography>
            </Button>
          )}
          <SocialMenu
            links={get(data[lang], "footer.footer_links.data")}
            className="gap-x-2 mt-6"
          />
        </div>
        <div className="hidden lg:flex lg:w-[76%] lg:pl-32 gap-x-10 overflow-hidden">
          {!isEmpty(get(data[lang], "body")) && (
            <FooterMenu
              className="gap-y-3 flex flex-col"
              items={get(data[lang], "body")}
            />
          )}
        </div>
      </footer>
      <FooterBrand
        lang={lang}
        className="flex flex-col-reverse lg:flex-row items-center gap-3 lg:justify-between bg-gray-50 text-xs"
      />
    </div>
  );
};

export default Footer;
