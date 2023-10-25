"use client";
import Link from "next/link";
import Image from "next/image";
import get from "lodash/get";
import map from "lodash/map";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import UserMenu from "@/components/atoms/userMenu/UserMenu";
import { INavbar } from "@/components/molecules/navbar/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentLang, checkIsAuthenticated } from "@/utils/helper";
import { updateIsShowDrawer } from "@/redux/features/landingSlice/landingSlice";

import Button from "@/components/atoms/button/Button";
import InboxButton from "@/components/atoms/inboxButton/InboxButton";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";
import SearchBar from "@/components/molecules/searchBar/SearchBar";

import OpenMenuIcon from "../../../../public/images/open_menu.svg";
import Typography from "@/components/atoms/typography/Typography";

const Navbar = ({ data, lang, variant, isScrolledHeaderActive }: INavbar) => {
  const dispatch = useAppDispatch();
  const { showSearchbar } = useAppSelector((state) => state.listingReducer);
  const { isMinifyButtons, isShowHeaderButtons } = useAppSelector(
    (state) => state.landingReducer
  );
  const handleLogoSource = () => {
    // if (activePath === `/${locale}` || activePath === "/") {
    //   return isScrolledHeaderActive
    //     ? "/images/missafir_logo_black.svg"
    //     : get(data, "header.logo.image");
    // } else {
    return "/images/missafir_logo_black.svg";
    //}
  };

  const openMenuClass = classNames("fill-gray-800", {
    // "fill-gray-800": activePath === "/" && !isScrolledHeaderActive,
    // "fill-gray-800": activePath !== "/" || isScrolledHeaderActive
  });

  return (
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar lg:h-28 lg:py-0 lg:px-10 flex justify-between items-center">
        <Link href={`/${getCurrentLang()}`}>
          <Image
            priority
            width="0"
            height="0"
            alt="missafir-logo"
            src={handleLogoSource() || "/"}
            className="w-28 lg:w-44 h-auto cursor-pointer"
          />
        </Link>
        {!isMobile && showSearchbar && (
          <div className="min-w-[32rem] relative">
            <SearchBar isInCustomSection={true} />
          </div>
        )}
        <div className="flex gap-6 ml-auto lg:ml-0">
          {isShowHeaderButtons
            ? map(
                get(data, "header.buttons"),
                ({ link, image, label }, key) => {
                  if (!link || !image || !label) return;
                  return (
                    <Button
                      key={key}
                      isRtl={false}
                      link={link}
                      variant="btn-primary"
                      className={`hidden lg:flex ${
                        isMinifyButtons
                          ? "rounded-xl w-11 h-11 px-2 min-h-[2.75rem]"
                          : null
                      }`}>
                      <Image
                        src={image || "/"}
                        width="0"
                        height="0"
                        className="w-5 h-auto"
                        alt=""
                      />
                      {isMinifyButtons === false ? (
                        <span>
                          <Typography element="span" variant="p3">
                            {label}
                          </Typography>
                        </span>
                      ) : (
                        ""
                      )}
                    </Button>
                  );
                }
              )
            : null}
          {checkIsAuthenticated() && (
            <div className="lg:mx-3">
              <InboxButton variant={variant} />
            </div>
          )}
          {isMobile ? null : (
            <div className="hidden lg:block">
              <SelectLanguage
                isScrolledHeaderActive={isScrolledHeaderActive}
                className="w-20"
                showIndicator={false}
                variant={variant}
                languages={get(data, "header.languageMenu.languages")}
              />
            </div>
          )}
          <div className="hidden lg:flex">
            <UserMenu
              lang={lang}
              variant={variant}
              data={get(data, "userMenuData")}
              isScrolledHeaderActive={isScrolledHeaderActive}
            />
          </div>
        </div>
        <div className="flex-none lg:hidden">
          <label
            htmlFor="missafir-drawer"
            onClick={() => dispatch(updateIsShowDrawer(true))}
            className="btn btn-square btn-ghost">
            <OpenMenuIcon className={openMenuClass} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
