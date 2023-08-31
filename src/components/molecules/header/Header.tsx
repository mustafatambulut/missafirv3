"use client";
import { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { get, isNull, split } from "lodash";
import { usePathname } from "next/navigation";
import { isMobile } from "react-device-detect";

import {
  checkSameItem,
  getLocalStorage,
  setLocalStorage
} from "@/utils/helper";
import {
  fetchLocations,
  updateLocations,
  fetchDataByPage
} from "@/redux/features/landingSlice/landingSlice";
import { HOME } from "@/app/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useFetchData from "@/app/hooks/useFetchData";
import usePageScroll from "@/app/hooks/usePageScroll";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";
import { IFooter } from "@/components/molecules/footer/types";
import { IHeader } from "@/components/molecules/header/types";
import { FOOTER } from "@/components/molecules/footer/constant";
import { HEADER } from "@/components/molecules/header/constants";
import { changeIsPressReservButton } from "@/redux/features/reservationSlice/reservationSlice";

import Loading from "@/components/atoms/loading/Loading";
import Drawer from "@/components/molecules/drawer/Drawer";
import Navbar from "@/components/molecules/navbar/Navbar";

const Header = ({ lang }: string) => {
  const pathName = usePathname();
  const [header, setHeader] = useState<IHeader>(null);
  const [footerMenu, setFooterMenu] = useState<IFooter>(null);
  const [footerBrand, setFooterBrand] = useState<IFooterBrand>(null);

  const dispatch = useAppDispatch();
  const { isScrolledHeaderActive } = usePageScroll();
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
  }, []);

  useEffect(() => {
    isShowDrawer
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isShowDrawer]);

  useEffect(() => {
    if (!checkSameItem(split(pathName, "/"), ["login", "signup"])) {
      dispatch(changeIsPressReservButton(false));
    }
  }, [pathName]);

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
