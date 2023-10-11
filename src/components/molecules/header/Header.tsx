"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import moment from "moment/moment";
import { useLocale } from "next-intl";
import turkish from "moment/locale/tr";
import english from "moment/locale/en-gb";
import montenegro from "moment/locale/hr";
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
  fetchDataByPage,
  updateActivePath
} from "@/redux/features/landingSlice/landingSlice";
import { HOME } from "@/app/constants";
import useFetchData from "@/app/hooks/useFetchData";
import usePageScroll from "@/app/hooks/usePageScroll";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
import HeaderSkeleton from "@/components/molecules/skeletons/headerSkeleton/HeaderSkeleton";

const Header = ({ lang }: string) => {
  const locale = useLocale();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { isScrolledHeaderActive } = usePageScroll();
  const [header, setHeader] = useState<IHeader>(null);
  const [footerMenu, setFooterMenu] = useState<IFooter>(null);
  const [footerBrand, setFooterBrand] = useState<IFooterBrand>(null);

  const entities = useFetchData([HEADER, FOOTER, FOOTER_BRAND]);

  const { isShowDrawer, activePath } = useAppSelector(
    (state) => state.landingReducer
  );

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

  const getVariant = () => {
    if (activePath === `/${locale}` || activePath === "/") {
      return isScrolledHeaderActive ? "light" : "dark";
    } else {
      return "light";
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
    // todo: tüm clientlerde localstorage güncellemek için yorum satırına alındı, geri alınacak
    // const locations = getLocalStorage("locations");
    // locations
    //   ? dispatch(updateLocations(JSON.parse(locations)))
    //   : dispatch(fetchLocations());
    dispatch(fetchLocations());
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
    dispatch(updateActivePath(pathName));
  }, [pathName]);

  useEffect(() => {
    const lang = getLocalStorage("lang");
    if (lang) {
      switch (lang) {
        case "tr":
          moment.updateLocale("tr", turkish);
          break;
        case "en":
          moment.updateLocale("en", english);
          break;
        case "hr":
          moment.updateLocale("hr", montenegro);
          break;
        default:
          moment.updateLocale("en-gb", english);
          break;
      }
    }
  }, []);

  return (
    <Loading isLoading={isNull(entities)} loader={<HeaderSkeleton />}>
      <div className={headerClass}>
        <div className={drawerClass}>
          {header && userMenuData && (
            <Navbar
              activePath={activePath}
              variant={getVariant()}
              data={navbarData}
              isScrolledHeaderActive={isScrolledHeaderActive}
            />
          )}
          {typeof window !== "undefined" && isMobile
            ? createPortal(
                <Drawer activePath={activePath} data={drawerData} />,
                window.document.body
              )
            : null}
        </div>
      </div>
    </Loading>
  );
};
export default Header;
