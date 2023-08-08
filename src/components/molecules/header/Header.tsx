"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { get, head, size } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isMobile } from "react-device-detect";

import { HOME } from "@/app/constants";
import { useAppSelector } from "@/app/hooks";
import { getScrollPosition } from "@/utils/helper";
import { fetchDataByPage } from "@/redux/features/landingSlice";

import Loading from "@/components/atoms/loading/Loading";
import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = () => {
  const [header, setHeader] = useState(null);
  const [footerMenu, setFooterMenu] = useState(null);
  const [footerBrand, setFooterBrand] = useState(null);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const drawerCloseRef = useRef<HTMLInputElement>(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

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
          data={navbarData}
          isScrolledHeaderActive={isScrolledHeaderActive}
        />
      );
    }
  };

  const DrawerComponent = (): ReactNode => {
    if (isMobile) {
      return <Drawer data={drawerData} drawerCloseRef={drawerCloseRef} />;
    }
  };

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    setIsScrolledHeaderActive(scrollPosition > 100);
  };

  useEffect(() => {
    if (size(entities)) {
      const data = head(entities);
      setHeader(get(data, "header"));
      setFooterMenu(get(data, "footer"));
      setFooterBrand(get(data, "footerBrand"));
    }
  }, [entities]);

  useEffect(() => {
    dispatch(fetchDataByPage(HOME));
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Loading
      isLoading={!size(entities)}
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
          {NavbarComponent()}
          {DrawerComponent()}
        </div>
      </div>
    </Loading>
  );
};
export default Header;
