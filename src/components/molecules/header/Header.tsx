"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { get, isNull } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isMobile } from "react-device-detect";

import { getScrollPosition } from "@/utils/helper";
import useFetchData from "@/app/hooks/useFetchData";
import { fetchDataByPage } from "@/redux/features/landingSlice";
import { HOME } from "@/app/constants";
import { FOOTER } from "@/components/molecules/footer/constant";
import { HEADER } from "@/components/molecules/header/constants";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";
import { IHeader } from "@/components/molecules/header/types";
import { IFooter } from "@/components/molecules/footer/types";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";

import Loading from "@/components/atoms/loading/Loading";
import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = () => {
  /*
    client side translation example
    const t = useTranslations("home");
    <h1 className="text-red-500 text-xl">{t("title")}</h1>
*/
  const [header, setHeader] = useState<IHeader>(null);
  const [footerMenu, setFooterMenu] = useState<IFooter>(null);
  const [footerBrand, setFooterBrand] = useState<IFooterBrand>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const entities = useFetchData([HEADER, FOOTER, FOOTER_BRAND]);

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

  const NavbarComponent = (): ReactNode => {
    if (header && userMenuData) {
      return (
        <Navbar
          setIsDrawerOpen={setIsDrawerOpen}
          data={navbarData}
          isScrolledHeaderActive={isScrolledHeaderActive}
        />
      );
    }
  };

  const DrawerComponent = (): ReactNode => {
    if (isMobile) {
      return (
        <Drawer
          data={drawerData}
          drawerCloseRef={drawerCloseRef}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      );
    }
  };

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    setIsScrolledHeaderActive(scrollPosition > 100);
  };

  useEffect(() => {
    if (!entities) return;
    setHeader(get(entities, "header"));
    setFooterMenu(get(entities, "footer"));
    setFooterBrand(get(entities, "footerBrand"));
  }, [entities]);

  useEffect(() => {
    dispatch(fetchDataByPage(HOME));
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
    <Loading
      isLoading={isNull(entities)}
      loader={<p className="text-xl">Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <div className={headerClass}>
        <div className="drawer">
          <input
            ref={drawerCloseRef}
            id="missafir-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <NavbarComponent />
          <DrawerComponent />
        </div>
      </div>
    </Loading>
  );
};
export default Header;
