"use client";
import React, { useRef } from "react";
import { get } from "lodash";

import Image from "next/image";
import { getDummyDataByType } from "@/utils/helper";

import { INavbar } from "@/components/molecules/navbar/types";

import User from "@/components/atoms/user";
import Button from "@/components/atoms/button";
import LanguageSelect from "@/components/atoms/languageSelect";
import Menu from "@/components/molecules/menu";

import HeartIcon from "../../../../public/images/heart-white.svg";

const Navbar: React.FC<INavbar> = ({ navbarItems }) => {
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
        <div className="w-full navbar sm:py-8 sm:px-10">
          <div className="flex-1">
            <a href="/">
              <Image
                className="w-[122px] sm:w-[172px]"
                src={get(navbarItems, "logo.data.attributes.url") || ""}
                alt="logo"
                width={172}
                height={32}
              />
            </a>
          </div>
          <div className="flex gap-6">
            <Button variant="primary" className="hidden sm:flex">
              <HeartIcon className="mr-2 fill-white" />
              <span>{get(navbarItems, "button.label")}</span>
            </Button>
            <div className="hidden sm:block">
              <LanguageSelect
                showIndicator={false}
                languages={get(navbarItems, "languages")}
                variant={"dark"}
              />
            </div>
            <div className="hidden sm:flex">
              <User variant="dark" />
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
            <User variant="light" />
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
              showIndicator={true}
              languages={get(navbarItems, "languages")}
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
