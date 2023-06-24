import { IUser } from "@/components/atoms/user/types";

import Image from "next/image";

import HeartIcon from "../../../../public/images/heart-white.svg";

const User = ({ variant = "" }: IUser) => {
  return (
    <ul className="menu lg:menu-horizontal w-16 bg-transparent p-0">
      <li>
        <details className="active:bg-transparent">
          <summary
            className={`justify-start ${
              variant === "dark" && "text-white"
            } p-0 focus:bg-transparent font-base mb-2 sm:mb-0`}>
            <Image
              src={`${
                variant === "dark"
                  ? "/images/user-light.svg"
                  : "/images/user-dark.svg"
              }`}
              alt="user"
              width={24}
              height={24}
              className="rounded-full bg-grey-100 p-1 sm:rounded-none sm:bg-transparent sm:p-0"
            />
          </summary>
          <ul className="before:hidden m-0 p-0 sm:p-2 sm:m-6 sm:mr-0 sm:right-0">
            <li>
              <a className="pl-0 sm:pl-2 active:bg-transparent text-black text-lg">
                Sign Up
              </a>
            </li>
            <li>
              <a className="pl-0 sm:pl-2 active:bg-transparent text-primary sm:text-black text-lg">
                Login
              </a>
            </li>
            <li>
              <a className="pl-0 sm:pl-2 active:bg-transparent text-primary sm:text-black text-lg">
                <span>Become a homeowner</span>
                <HeartIcon className="fill-primary sm:hidden" />
              </a>
            </li>
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

export default User;
