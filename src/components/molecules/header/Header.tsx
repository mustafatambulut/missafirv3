"use client";
import { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] = useState(false);
  const drawerCloseRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

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
              setIsDrawerOpen={setIsDrawerOpen}
              data={navbarData}
              isScrolledHeaderActive={isScrolledHeaderActive}
            />
            {isMobile && (
              <Drawer
                data={drawerData}
                drawerCloseRef={drawerCloseRef}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
