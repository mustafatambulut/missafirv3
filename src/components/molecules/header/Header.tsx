"use client";
import { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { get, isNull } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isMobile } from "react-device-detect";

import { HOME } from "@/app/constants";
import { useAppSelector } from "@/redux/hooks";
import useFetchData from "@/app/hooks/useFetchData";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";
import { FOOTER } from "@/components/molecules/footer/constant";
import { HEADER } from "@/components/molecules/header/constants";
import { IHeader } from "@/components/molecules/header/types";
import { IFooter } from "@/components/molecules/footer/types";
import {
  getLocalStorage,
  getScrollPosition,
  setLocalStorage
} from "@/utils/helper";
import {
  fetchDataByPage,
  fetchLocations,
  updateLocations
} from "@/redux/features/landingSlice/landingSlice";

import Loading from "@/components/atoms/loading/Loading";
import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = ({ lang }: string) => {
  const [header, setHeader] = useState<IHeader>(null);
  const [footerMenu, setFooterMenu] = useState<IFooter>(null);
  const [footerBrand, setFooterBrand] = useState<IFooterBrand>(null);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const entities = useFetchData([HEADER, FOOTER, FOOTER_BRAND]);
  const { isShowDrawer } = useAppSelector((state) => state.landingReducer);

  const headerClass = classNames("fixed top-0 w-full z-40", {
    "bg-white shadow-lg": isScrolledHeaderActive
  });

  const drawerClass = classNames("drawer", {
    "drawer-open": isShowDrawer
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
          data={navbarData}
          isScrolledHeaderActive={isScrolledHeaderActive}
        />
      );
    }
  };

  const DrawerComponent = (): ReactNode => {
    if (isMobile && isShowDrawer) {
      return <Drawer data={drawerData} />;
    }
  };

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 10 : 30;
    setIsScrolledHeaderActive(scrollPosition > requiredScrollPosition);
  };

  useEffect(() => {
    if (!entities) return;
    setHeader(get(entities, "header"));
    setFooterMenu(get(entities, "footer"));
    setFooterBrand(get(entities, "footerBrand"));
  }, [entities]);

  useEffect(() => {
    setLocalStorage("lang", lang);
    dispatch(fetchDataByPage(HOME));
    const locations = getLocalStorage("locations");
    locations
      ? dispatch(updateLocations(JSON.parse(locations)))
      : dispatch(fetchLocations());
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    isShowDrawer
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isShowDrawer]);

  return (
    <Loading
      isLoading={isNull(entities)}
      loader={<p className="text-xl">Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <div className={headerClass}>
        <div className={drawerClass}>
          <NavbarComponent />
          <DrawerComponent />
        </div>
      </div>
    </Loading>
  );
};
export default Header;
