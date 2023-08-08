"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, head, size } from "lodash";

import { useAppSelector } from "@/app/hooks";
import { IFooter } from "@/components/molecules/footer/types";
import { FOOTER } from "@/components/molecules/footer/constant";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import SocialMenu from "@/components/atoms/socialMenu/SocialMenu";
import FooterBrand from "@/components/atoms/footerBrand/FooterBrand";
import FooterMenu from "@/components/molecules/footerMenu/FooterMenu";

const Footer = () => {
  const [data, setData] = useState<IFooter>(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) setData(get(head(entities), FOOTER));
  }, [entities]);

  return (
    <Loading
      isLoading={!data}
      loader={<p className="text-xl">Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <div>
        <footer className="footer border-t lg:border-none px-4 lg:px-10 pt-10 mt-10 lg:pt-20 pb-10 lg:flex">
          <div className="flex flex-col items-center lg:block w-full lg:w-80">
            <Link href="/">
              <Image
                priority
                src={get(data, "header.image")}
                width="0"
                height="0"
                alt="logo"
                className="w-40 lg:w-52 h-auto"
              />
            </Link>
            <p className="my-6 text-center lg:text-left text-base font-mi-sans-semi-bold text-gray-600">
              {get(data, "header.description")}
            </p>
            <Button
              isRtl={false}
              variant="btn-primary"
              link={get(data, "header.buttonLink")}>
              <Image
                priority
                src={get(data, "header.buttonImage")}
                width="0"
                height="0"
                className="w-5 h-auto"
                alt="image"
              />
              <span>{get(data, "header.buttonLabel")}</span>
            </Button>
            <SocialMenu
              links={get(data, "footer.footer_links.data")}
              className="gap-x-2 mt-6"
            />
          </div>
          <div className="hidden lg:flex lg:flex-1 gap-x-48 lg:pl-32">
            <FooterMenu
              className="gap-y-3 flex flex-col"
              items={get(data, "body")}
            />
          </div>
        </footer>
        <FooterBrand className="flex flex-col-reverse lg:flex-row items-center gap-3 lg:justify-between bg-gray-50 text-xs" />
      </div>
    </Loading>
  );
};

export default Footer;
