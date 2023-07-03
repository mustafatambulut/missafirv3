"use client";
import React, { useRef } from "react";
import { get, map } from "lodash";

import Image from "next/image";
import { getDummyDataByType } from "@/utils/helper";

import { INavbar } from "@/components/molecules/navbar/types";

import UserMenu from "../../atoms/userMenu";
import Button from "@/components/atoms/button";
import LanguageSelect from "@/components/atoms/languageSelect";
import Menu from "@/components/molecules/menu";

import HeartIcon from "../../../../public/images/heart-white.svg";

const Navbar = ({ navbarItems }: INavbar) => {
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const dummyMenuItems = getDummyDataByType("dummyMenuItems");

  const handleDrawerClose = () => {
    drawerCloseRef.current?.click();
  };
  return (
    <div className="drawer">
      <input
        ref={drawerCloseRef}
        id="missafir-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar lg:py-8 lg:px-10">
          <div className="flex-1">
            <a href={get(navbarItems, "logo.link") || ""}>
              <Image
                className="w-[122px] lg:w-[172px]"
                src={get(navbarItems, "logo.image") || ""}
                alt="logo"
                width={172}
                height={32}
              />
            </a>
          </div>
          <div className="flex gap-6">
            {map(get(navbarItems, "button"), (button) => (
              <Button
                link={get(button, "link")}
                key={button.id}
                variant="primary"
                className="hidden lg:flex">
                <HeartIcon className="mr-2 fill-white" />
                <span>{get(button, "label")}</span>
              </Button>
            ))}
            <div className="hidden lg:block">
              <LanguageSelect
                id={get(navbarItems, "langMenu.id")}
                image={get(navbarItems, "langMenu.image")}
                links={get(navbarItems, "langMenu.links")}
                showIndicator={false}
                variant={"dark"}
              />
            </div>
            <div className="hidden lg:flex">
              <UserMenu
                id={get(navbarItems, "userMenu.id")}
                image={get(navbarItems, "userMenu.image")}
                links={get(navbarItems, "userMenu.links")}
                variant="dark"
              />
            </div>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="missafir-drawer"
              className="btn btn-square btn-ghost">
              <Image
                src="/images/open-menu.svg"
                alt="open"
                width={20}
                height={20}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="missafir-drawer" className="drawer-overlay"></label>
        <div className="p-8 w-full h-full bg-white relative flex flex-col overflow-y-auto">
          <div className="border-b border-gray-100 pb-5 mb-5 flex items-start justify-between">
            <UserMenu
              id={get(navbarItems, "userMenu.id")}
              image={get(navbarItems, "userMenu.image")}
              links={get(navbarItems, "userMenu.links")}
              variant="light"
            />
            <Image
              onClick={handleDrawerClose}
              src="/images/close.svg"
              alt="close"
              width={20}
              height={20}
            />
          </div>
          <div className="border-b border-gray-100 pb-5 mb-5 flex items-start justify-between">
            <Menu isCollapsable={true} links={dummyMenuItems} />
          </div>
          <div className="w-[116px] mb-5">
            <LanguageSelect
              id={get(navbarItems, "langMenu.id")}
              image={get(navbarItems, "langMenu.image")}
              links={get(navbarItems, "langMenu.links")}
              showIndicator={true}
              variant={"light"}
            />
          </div>
          <div className="mt-auto flex flex-col text-grey-500">
            <a href="#" className="mb-2 text-xs">
              Terms of Use
            </a>
            <a href="#" className="text-xs">
              Privacy Policy
            </a>
            <span className="mt-5 text-xxs">
              ©2023 MSFR All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
