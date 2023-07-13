"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { get } from "lodash";

import { HOME } from "@/app/constants";
import { getPageDataByComponent, getScrollPosition } from "@/utils/helper";
import { IHeader } from "@/components/molecules/header/types";
import { FOOTER } from "@/components/molecules/footer/constant";
import { HEADER } from "@/components/molecules/header/constants";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";

import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = () => {
  const [header, setHeader] = useState(null);
  const [footerMenu, setFooterMenu] = useState(null);
  const [footerBrand, setFooterBrand] = useState(null);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] = useState(false);
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  drawerCloseRef.current?.click();

  const headerClass = classNames("fixed top-0 w-full z-40", {
    "bg-white shadow-lg": isScrolledHeaderActive
  });

  const userMenuData = {
    footerMenu,
    footerBrand,
    buttons: get(header, "buttons"),
    image: get(header, "userMenu.image"),
    links: get(header, "userMenu.user_links")
  };

  const drawerData = {
    userMenuData,
    languages: get(header, "languageMenu.languages"),
    links: get(footerBrand, "body.brand_links.data")
  };

  const navbarData = {
    header,
    userMenuData
  };

  const fetchData = async () => {
    const { header, footer, footerBrand } = (await getPageDataByComponent(
      HOME,
      [HEADER, FOOTER, FOOTER_BRAND]
    )) as IHeader;
    setHeader(header);
    setFooterMenu(footer);
    setFooterBrand(footerBrand);
  };

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    setIsScrolledHeaderActive(scrollPosition > 100);
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {header && footerMenu && (
        <div className={headerClass}>
          <div className="drawer">
            <input
              ref={drawerCloseRef}
              id="missafir-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <Navbar
              data={navbarData}
              isScrolledHeaderActive={isScrolledHeaderActive}
            />
            <Drawer data={drawerData} drawerCloseRef={drawerCloseRef} />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
