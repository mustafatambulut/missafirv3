import { ReactNode, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import OutsideClickHandler from "react-outside-click-handler";

import { IUserMenu } from "@/components/atoms/userMenu/types";
import { checkAuth, getLocalStorage, removeLocalStorage } from "@/utils/helper";

import Button from "@/components/atoms/button/Button";
import DropDown from "@/components/atoms/dropDown/DropDown";

import UserDark from "../../../../public/images/user_dark.svg";
import UserLight from "../../../../public/images/user_light.svg";
import Typography from "../typography/Typography";

const UserMenu = ({
  data,
  variant = "",
  isScrolledHeaderActive,
  isInDrawer = false,
  handleDrawerClose = null
}: IUserMenu) => {
  const t = useTranslations();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDetailsElement>(null);

  const summaryClass = classNames(
    "justify-start p-0 focus:bg-transparent hover:bg-transparent font-base mb-2 lg:mb-0",
    {
      "bg-none text-white": variant === "dark"
    }
  );
  const handleOutsideClick = () => {
    if (!get(userMenuRef, "current")) return;
    get(userMenuRef, "current")?.removeAttribute("open");
  };

  const handleClick = () => {
    isInDrawer && handleDrawerClose ? handleDrawerClose() : null;
  };

  const handleLogout = () => {
    removeLocalStorage("token");
    handleClick();
    router.push("/");
    router.refresh();
  };

  const userMenuLabel = () => {
    const authUser = getLocalStorage("authUser")
      ? JSON.parse(getLocalStorage("authUser"))
      : null;
    return checkAuth() ? get(authUser, "fullname", "") : undefined;
  };

  const AuthComponent = (): ReactNode => {
    return checkAuth() ? (
      <>
        <li>
          <Link
            onClick={handleClick}
            href="/profile"
            className="justify-start text-lg lg:text-xl pl-0 lg:pl-2 text-gray-500 hover:bg-transparent hover:text-primary">
            {t("profile")}
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className="justify-start hover:bg-transparent text-lg lg:text-xl pl-0 lg:pl-2 text-gray-500 hover:text-primary">
            {t("logout")}
          </div>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            onClick={handleClick}
            href="/login"
            className="justify-start text-lg lg:text-xl pl-0 lg:pl-2 text-gray-500 hover:bg-transparent hover:text-primary">
            {t("login")}
          </Link>
        </li>
        <li>
          <Link
            onClick={handleClick}
            href="/signup"
            className="justify-start text-lg lg:text-xl pl-0 lg:pl-2 text-gray-500 hover:bg-transparent hover:text-primary">
            {t("sign_up")}
          </Link>
        </li>
      </>
    );
  };
  const MobileUserMenuComponent = () => {
    return (
      <ul className="menu bg-transparent p-0">
        <li>
          <details className="active:bg-transparent" ref={userMenuRef}>
            <summary className={summaryClass}>
              {variant === "light" ? (
                <div className="rounded-full w-6 h-6 bg-gray-50 flex justify-center items-center">
                  <UserDark className="fill-gray-400" />
                </div>
              ) : (
                <UserLight />
              )}
              <span>{userMenuLabel()}</span>
            </summary>
            <ul className="before:hidden m-0 p-0 text-gray-700">
              <>
                {checkAuth() &&
                  map(get(data, "links.data"), (menuItem, key) => (
                    <li key={key}>
                      <Link
                        onClick={handleClick}
                        href={get(menuItem, "attributes.link")}
                        className="pl-0 active:bg-transparent text-lg hover:bg-transparent hover:text-primary">
                        {get(menuItem, "attributes.label")}
                      </Link>
                    </li>
                  ))}
                <AuthComponent handleClick={handleClick} />
              </>
              {map(get(data, "buttons"), (button, key) => (
                <li key={key}>
                  <Button
                    onClick={handleClick}
                    isRtl={isMobile}
                    link={get(button, "link")}
                    variant="btn-ghost"
                    className="pl-0 gap-0 text-lg whitespace-nowrap active:bg-transparent text-primary gap-x-1 justify-end hover:bg-transparent hover:text-primary">
                    {get(button, "image") && (
                      <Image
                        src={get(button, "image") || "/"}
                        width="0"
                        height="0"
                        className="w-5 h-auto"
                        style={{
                          filter:
                            "invert(28%) sepia(99%) saturate(4798%) hue-rotate(331deg) brightness(83%) contrast(94%)"
                        }}
                        alt=""
                      />
                    )}
                    <span>{get(button, "label")}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    );
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      {isMobile ? (
        <MobileUserMenuComponent />
      ) : (
        <DropDown
          label={userMenuLabel()}
          className="dropdown-end"
          imageSrc={get(data, "image")}
          isScrolledHeaderActive={isScrolledHeaderActive}
          variant={variant}>
          <>
            {checkAuth() &&
              map(get(data, "links.data"), (menuItem, key) => (
                <div key={key}>
                  {get(menuItem, "attributes.link") && (
                    <li>
                      <Link
                        href={get(menuItem, "attributes.link")}
                        className="justify-start text-lg lg:text-xl pl-0 lg:pl-2 lg:text-gray-500 hover:bg-transparent hover:text-primary">
                        {get(menuItem, "attributes.label")}
                      </Link>
                    </li>
                  )}
                </div>
              ))}
            <AuthComponent />
          </>
        </DropDown>
      )}
    </OutsideClickHandler>
  );
};

export default UserMenu;
