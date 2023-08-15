import Image from "next/image";
import { get, map } from "lodash";
import moment from "moment/moment";

import { useAppDispatch } from "@/redux/hooks";
import { IDrawer } from "@/components/molecules/drawer/types";
import { updateIsShowDrawer } from "@/redux/features/landingSlice/landingSlice";

import UserMenu from "@/components/atoms/userMenu/UserMenu";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";
import DropDownLinkMenu from "@/components/atoms/dropDownLinkMenu/DropDownLinkMenu";
import Menu from "@/components/molecules/menu/Menu";

const Drawer = ({ data }: IDrawer) => {
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => dispatch(updateIsShowDrawer(false));

  return (
    <div className="">
      <label htmlFor="missafir-drawer" className="drawer-overlay"></label>
      <div className="p-8 w-screen h-screen bg-white relative flex flex-col overflow-y-auto">
        <div className="border-b border-gray-100 pb-5 mb-5 flex items-start justify-between">
          <UserMenu variant="light" data={get(data, "userMenuData")} />
          <Image
            onClick={handleDrawerClose}
            src="/images/close.svg"
            alt="close"
            width={20}
            height={20}
          />
        </div>
        <div className="border-b border-gray-100 pb-5 mb-5 flex flex-col">
          {map(get(data, "userMenuData.footerMenu.body"), (items, key) => (
            <DropDownLinkMenu className="" items={items} key={key} />
          ))}
        </div>
        <div className="w-28 mb-5">
          <SelectLanguage
            variant={"gray"}
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
  );
};

export default Drawer;
