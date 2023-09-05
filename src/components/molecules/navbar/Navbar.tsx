import Image from "next/image";
import { get, map } from "lodash";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UserMenu from "@/components/atoms/userMenu/UserMenu";
import { INavbar } from "@/components/molecules/navbar/types";
import { updateIsShowDrawer } from "@/redux/features/landingSlice/landingSlice";

import Button from "@/components/atoms/button/Button";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";
import SearchBar from "@/components/molecules/searchBar/SearchBar";

const Navbar = ({ data, isScrolledHeaderActive }: INavbar) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSearchbar } = useAppSelector((state) => state.listingReducer);
  const handleLogoSource = () => {
    return isScrolledHeaderActive
      ? "/images/missafir_logo_black.svg"
      : get(data, "header.logo.image");
  };

  const handleVariant = () => (isScrolledHeaderActive ? "gray" : "ghost");

  const handleOpenMenuSource = () => {
    return `${
      isScrolledHeaderActive
        ? "/images/open_menu_black.svg"
        : "/images/open_menu.svg"
    }`;
  };

  const handleLogoOnClick = () => {
    router.push(`${get(data, "header.logo.link")}` || "/");
    router.refresh();
  };

  return (
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar lg:py-8 lg:px-10 flex justify-between">
        <div className="">
            <Image
              priority
              width="0"
              height="0"
              alt="missafir-logo"
              src={handleLogoSource()}
              onClick={handleLogoOnClick}
              className="w-28 lg:w-44 h-auto cursor-pointer"
            />
        </div>
        {!isMobile && showSearchbar && (
          <div className="min-w-[32rem] relative">
            <SearchBar isInCustomSection={true} />
          </div>
        )}
        <div className="flex gap-6">
          {map(get(data, "header.buttons"), (button, key) => (
            <Button
              key={key}
              isRtl={false}
              link={get(button, "link")}
              variant="btn-primary"
              className="hidden lg:flex">
              <Image
                src={get(button, "image")}
                width="0"
                height="0"
                className="w-5 h-auto"
                alt=""
              />
              <span>{get(button, "label")}</span>
            </Button>
          ))}
          <div className="hidden lg:block">
            <SelectLanguage
              className="w-20"
              showIndicator={false}
              variant={handleVariant()}
              languages={get(data, "header.languageMenu.languages")}
            />
          </div>
          <div className="hidden lg:flex">
            <UserMenu
              variant={handleVariant()}
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
            <Image
              src={handleOpenMenuSource()}
              alt="open"
              width={20}
              height={20}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
