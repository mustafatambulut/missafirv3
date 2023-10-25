"use client";
import { get } from "lodash";

import useFetchData from "@/app/hooks/useFetchData";
import { FooterBrandProps } from "@/components/atoms/footerBrand/types";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";

import Loading from "@/components/atoms/loading/Loading";
import Menu from "@/components/molecules/menu/Menu";
import Typography from "../typography/Typography";
import { useAppSelector } from "@/redux/hooks";

const FooterBrand = ({lang, className = "" }: FooterBrandProps) => {
  //const data = useFetchData(FOOTER_BRAND);
  const data = useAppSelector((state) => state.landingReducer.footerBrandData);

  return (
    <footer className={`footer footer-center p-4 ${className}`}>
      <div className="flex">
        <Typography variant="p6" element="span">
          {get(data[lang], "header.title")}{" "}
        </Typography>
        <Typography variant="p6" element="p">
          {get(data[lang], "header.description")}{" "}
        </Typography>
      </div>
      <div>
        <Menu
          isCollapsable={false}
          menuItemClass="text-15 text-gray-500 font-mi-sans-semi-bold"
          className="flex-row gap-x-7"
          links={get(data[lang], "body.brand_links.data")}
        />
      </div>
    </footer>
  );
};

export default FooterBrand;
