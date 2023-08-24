import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";

import { useAppDispatch } from "@/redux/hooks";
import UserMenu from "@/components/atoms/userMenu/UserMenu";
import { INavbar } from "@/components/molecules/navbar/types";
import { updateIsShowDrawer } from "@/redux/features/landingSlice/landingSlice";

import Button from "@/components/atoms/button/Button";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";

const Navbar = ({ data, isScrolledHeaderActive }: INavbar) => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar lg:py-8 lg:px-10">
        <div className="flex-1">
          <Link href={get(data, "header.logo.link") || "/"}>
            <Image
              priority
              width="0"
              height="0"
              alt="missafir-logo"
              src={handleLogoSource()}
              className="w-28 lg:w-44 h-auto"
            />
          </Link>
        </div>
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
