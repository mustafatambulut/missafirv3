"use client";
import { useRef } from "react";
import { get, map } from "lodash";
import moment from "moment/moment";

import { IDrawer } from "@/components/molecules/drawer/types";

import UserMenu from "@/components/atoms/userMenu/UserMenu";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";
import DropDownLinkMenu from "@/components/atoms/dropDownLinkMenu/DropDownLinkMenu";
import Menu from "@/components/molecules/menu/Menu";

import CloseIcon from "../../../../public/images/variants/close.svg";
import { updateIsShowDrawer } from "@/redux/features/landingSlice/landingSlice";
import { useAppDispatch } from "@/redux/hooks";

const Drawer = ({ data }: IDrawer) => {
  const dispatch = useAppDispatch();
  const drawerCloseRef = useRef<HTMLInputElement>(null);

  const handleDrawerClose = () => {
    if (drawerCloseRef.current) {
      drawerCloseRef.current.click();
      dispatch(updateIsShowDrawer(false));
    }
  };

  return (
    <div className="drawer z-50">
      <input
        ref={drawerCloseRef}
        id="missafir-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="missafir-drawer" className="drawer-overlay"></label>
        <div className="p-8 w-screen h-screen bg-white relative flex flex-col overflow-y-auto">
          <div className="border-b border-gray-100 pb-5 mb-5 fle flex-col items-start">
            <div className="flex justify-end mb-5">
              <CloseIcon
                className="fill-gray-800"
                onClick={handleDrawerClose}
              />
            </div>
            <UserMenu
              isInDrawer={true}
              handleDrawerClose={handleDrawerClose}
              variant="light"
              data={get(data, "userMenuData")}
            />
          </div>
          <div className="border-b border-gray-100 pb-5 mb-5 flex flex-col">
            {map(get(data, "userMenuData.footerMenu.body"), (items, key) => (
              <DropDownLinkMenu className="" items={items} key={key} />
            ))}
          </div>
          <div className="w-28 mb-5">
            <SelectLanguage
              className="gap-x-2 flex items-center justify-start"
              variant="light"
              showIndicator={true}
              languages={get(data, "languages")}
            />
          </div>
          <div className="mt-auto flex flex-col text-gray-500">
            <Menu
              isCollapsable={false}
              className="gap-y-2"
              menuItemClass="text-xs"
              links={get(data, "links")}
            />
            <span className="mt-5 text-xxs">
              {`© ${moment().year()} MSFR All rights reserved.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
