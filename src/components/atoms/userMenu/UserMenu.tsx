import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { IUserMenu } from "@/components/atoms/userMenu/types";

import Button from "@/components/atoms/button/Button";

const UserMenu = ({ variant = "", data }: IUserMenu) => {
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

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <ul className="menu lg:menu-horizontal w-16 bg-transparent p-0">
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
                width={24}
                height={24}
                className="rounded-full bg-gray-100 p-1 lg:bg-transparent lg:p-0"
              />
            </summary>
            <ul className="before:hidden m-0 p-0 lg:p-2 lg:m-6 lg:mr-0 lg:right-0 text-gray-700 lg:text-gray-600 font-mi-sans-semi-bold">
              {map(get(data, "links.data"), (menuItem) => (
                <li key={get(menuItem, "id")}>
                  <Link
                    href={get(menuItem, "attributes.link")}
                    className="pl-0 lg:pl-2 active:bg-transparent text-lg">
                    {get(menuItem, "attributes.label")}
                  </Link>
                </li>
              ))}
              {map(get(data, "buttons"), (button, key) => (
                <li key={key}>
                  <Button
                    isRtl={false}
                    link={get(button, "link")}
                    variant="btn-ghost"
                    className="pl-0 lg:pl-2 active:bg-transparent text-primary">
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
    </OutsideClickHandler>
  );
};

export default UserMenu;
