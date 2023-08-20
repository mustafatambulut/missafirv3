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
import { checkAuth, removeSessionStorage } from "@/utils/helper";

import Button from "@/components/atoms/button/Button";
import DropDown from "@/components/atoms/dropDown/DropDown";

const UserMenu = ({
  variant = "",
  data,
  isScrolledHeaderActive
}: IUserMenu) => {
  const t = useTranslations();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDetailsElement>(null);

  const summaryClass = classNames(
    "justify-start p-0 focus:bg-transparent hover:bg-transparent font-base mb-2 lg:mb-0",
    {
      "bg-none text-white": variant === "ghost"
    }
  );
  const handleOutsideClick = () => {
    if (!get(userMenuRef, "current")) return;
    get(userMenuRef, "current")?.removeAttribute("open");
  };

  const handleLogin = () => {
    router.push("/login");
    router.refresh();
  };

  const handleLogout = () => {
    removeSessionStorage("token");
    router.push("/");
    router.refresh();
  };

  const AuthComponent = (): ReactNode => {
    return checkAuth() ? (
      <button
        className="text-lg lg:text-xl pl-0 lg:pl-2 lg:text-gray-500 font-mi-sans lg:font-mi-sans-semi-bold"
        onClick={handleLogout}>
        Logout
      </button>
    ) : (
      <button
        className="text-lg lg:text-xl pl-0 lg:pl-2 lg:text-gray-500 font-mi-sans lg:font-mi-sans-semi-bold"
        onClick={handleLogin}>
        {t("login")}
      </button>
    );
  };

  const MobileUserMenuComponent = () => {
    return (
      <ul className="menu w-16 bg-transparent p-0">
        <li>
          <details className="active:bg-transparent" ref={userMenuRef}>
            <summary className={summaryClass}>
              <Image
                src={`${
                  get(data, "image")
                    ? get(data, "image")
                    : variant === "ghost" || variant === "light"
                    ? "/images/user_light.svg"
                    : "/images/user_dark.svg"
                }`}
                alt="user"
                width={40}
                height={40}
                className="rounded-full bg-gray-100"
              />
            </summary>
            <ul className="before:hidden m-0 p-0 text-gray-700 font-mi-sans-semi-bold">
              {map(get(data, "links.data"), (menuItem) => (
                <li key={get(menuItem, "id")}>
                  <Link
                    href={get(menuItem, "attributes.link")}
                    className="pl-0 active:bg-transparent text-lg font-mi-sans lg:font-mi-sans-semi-bold">
                    {get(menuItem, "attributes.label")}
                  </Link>
                  <AuthComponent />
                </li>
              ))}
              {map(get(data, "buttons"), (button, key) => (
                <li key={key}>
                  <Button
                    isRtl={false}
                    link={get(button, "link")}
                    variant="btn-ghost"
                    className="pl-0 gap-0 text-lg whitespace-nowrap active:bg-transparent text-primary">
                    <Image
                      src={get(button, "image") || ""}
                      width="0"
                      height="0"
                      className="w-5 h-auto"
                      alt=""
                    />
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
          label="melih şahin"
          className="dropdown-end"
          imageSrc={get(data, "image")}
          isScrolledHeaderActive={isScrolledHeaderActive}>
          {map(get(data, "links.data"), (menuItem, key) => (
            <li key={key} className="text-lg capitalize">
              <a
                className="px-2 text-xl text-gray-500 font-mi-sans lg:font-mi-sans-semi-bold"
                href={get(menuItem, "attributes.link")}>
                {get(menuItem, "attributes.label")}
              </a>
              <AuthComponent />
            </li>
          ))}
        </DropDown>
      )}
    </OutsideClickHandler>
  );
};

export default UserMenu;
