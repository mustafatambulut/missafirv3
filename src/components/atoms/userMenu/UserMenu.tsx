import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";

import { IUserMenu } from "@/components/atoms/userMenu/types";

import Button from "@/components/atoms/button/Button";
import FooterMenu from "@/components/molecules/footerMenu/FooterMenu";

const UserMenu = ({ variant = "", data }: IUserMenu) => {
  const summaryClass = classNames(
    "justify-start p-0 focus:bg-transparent font-base mb-2 lg:mb-0",
    {
      "text-white": variant === "dark"
    }
  );

  return (
    <ul className="menu lg:menu-horizontal w-16 bg-transparent p-0">
      <li>
        <details className="active:bg-transparent">
          <summary className={summaryClass}>
            <Image
              src={`${
                get(data, "image") || variant === "dark"
                  ? "/images/user-light.svg"
                  : "/images/user-dark.svg"
              }`}
              alt="user"
              width={24}
              height={24}
              className="rounded-full bg-gray-100 lg:bg-transparent lg:p-0"
            />
          </summary>
          <ul className="before:hidden m-0 p-0 lg:p-2 lg:m-6 lg:mr-0 lg:right-0 text-gray-700 lg:text-gray-600 font-mi-semi-bold">
            {map(get(data, "links.data"), (menuItem) => (
              <li key={get(menuItem, "id")}>
                <Link
                  href={get(menuItem, "attributes.link")}
                  className="pl-0 lg:pl-2 active:bg-transparent text-lg">
                  {get(menuItem, "attributes.label")}
                </Link>
                <FooterMenu
                  className="md:hidden"
                  items={get(data, "footerMenu.body")}
                />
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

    // <div
    //   ref={userDropdownRef}
    //   onBlur={() => handleOnBlur()}
    //   onFocus={() => handleOnFocus()}
    //   className="dropdown dropdown-end  ">
    //   <label
    //     tabIndex={0}
    //     className="avatar flex items-center gap-3 hover:cursor-pointer">
    //     <div className="w-6 rounded-full text-black">
    //       {/* todo: profil fotoğrafı endpointe eklenince güncellenecek */}
    //       {/*<img src={Avatar} alt="user" />*/}
    //       <Image src="/images/user-image.svg" alt="user" width={24} height={24} />
    //     </div>
    //     {/* todo: login olunca fullname gösterilecek */}
    //     {/*<span className="capitalize whitespace-nowrap hidden md:block">*/}
    //     {/*  {get(authUser, "fullname")}*/}
    //     {/*</span>*/}
    //     {/*<DownArrow />*/}
    //     <Image src="/images/arrow-down.svg" alt="user" width={16} height={16} className="w-4"/>
    //   </label>
    //   <ul
    //     tabIndex={0}
    //     className="menu dropdown-content shadow-sm bg-base-100 rounded-box capitalize mt-5 w-60">
    //     <li onClick={onClickSettings}>
    //       <a className="hover:bg-gray-hover" href="#">
    //         {/*<Settings className="fill-gray-400" />*/}
    //         Sign Up
    //       </a>
    //     </li>
    //     <li onClick={onClickSettings}>
    //       <a className="hover:bg-gray-hover" href="#">
    //         {/*<Settings className="fill-gray-400" />*/}
    //         Login
    //       </a>
    //     </li>
    //     <li onClick={onClickSettings}>
    //       <a className="hover:bg-gray-hover" href="#">
    //         {/*<Settings className="fill-gray-400" />*/}
    //         Become a homeowner
    //       </a>
    //     </li>
    //     {/*<li onClick={onClickLogout}>*/}
    //     {/*  <div className="hover:bg-gray-hover">*/}
    //     {/*    /!*<Logout className="fill-gray-400" />*!/*/}
    //     {/*    Çıkış Yap*/}
    //     {/*  </div>*/}
    //     {/*</li>*/}
    //   </ul>
    // </div>
  );
};

export default UserMenu;
