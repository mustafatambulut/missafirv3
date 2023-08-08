"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { get, head, size } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { HOME } from "@/app/constants";
import { useAppSelector } from "@/app/hooks";
import { isMobile } from "react-device-detect";
import { getScrollPosition } from "@/utils/helper";
import { fetchDataByPage } from "@/redux/features/landingSlice";

import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = () => {
  const [header, setHeader] = useState(null);
  const [footerMenu, setFooterMenu] = useState(null);
  const [footerBrand, setFooterBrand] = useState(null);
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] = useState(false);

  const drawerCloseRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) {
      const data = head(entities);
      setHeader(get(data, "header"));
      setFooterMenu(get(data, "footer"));
      setFooterBrand(get(data, "footerBrand"));
    }
  }, [entities]);

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

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    setIsScrolledHeaderActive(scrollPosition > 100);
  };

  useEffect(() => {
    dispatch(fetchDataByPage(HOME));
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {entities && (
        <Suspense fallback={<p>Loading feed...</p>}>
          <div className={headerClass}>
            <div className="drawer">
              <input ref={drawerCloseRef} id="missafir-drawer" type="checkbox" className="drawer-toggle" />
              {header && userMenuData && <Navbar data={navbarData} isScrolledHeaderActive={isScrolledHeaderActive} />}
              {isMobile && <Drawer data={drawerData} drawerCloseRef={drawerCloseRef} />}
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};
export default Header;
