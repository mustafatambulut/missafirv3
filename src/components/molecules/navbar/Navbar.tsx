import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";

import { INavbar } from "@/components/molecules/navbar/types";

import Button from "@/components/atoms/button/Button";
import UserMenu from "@/components/atoms/userMenu/UserMenu";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";

const Navbar = ({ data, isScrolledHeaderActive }: INavbar) => {
  const handleLogoSource = () => {
    return isScrolledHeaderActive ? "/images/missafir-logo-black.svg" : get(data, "header.logo.image");
  };

  const handleVariant = () => (isScrolledHeaderActive ? "gray" : "ghost");

  const handleOpenMenuSource = () => {
    return `${isScrolledHeaderActive ? "/images/open-menu-black.svg" : "/images/open-menu.svg"}`;
  };

  return (
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar lg:py-8 lg:px-10">
        <div className="flex-1">
          <Link href={get(data, "header.logo.link")}>
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
            <Button key={key} isRtl={false} link={get(button, "link")} variant="btn-primary" className="hidden lg:flex">
              <Image src={get(button, "image")} width="0" height="0" className="w-5 h-auto" alt="" />
              <span>{get(button, "label")}</span>
            </Button>
          ))}
          <div className="hidden lg:block">
            <SelectLanguage
              showIndicator={false}
              variant={handleVariant()}
              languages={get(data, "header.languageMenu.languages")}
            />
          </div>
          <div className="hidden lg:flex">
            <UserMenu variant={handleVariant()} data={get(data, "userMenuData")} />
          </div>
        </div>
        <div className="flex-none lg:hidden">
          <label htmlFor="missafir-drawer" className="btn btn-square btn-ghost">
            <Image src={handleOpenMenuSource()} alt="open" width={20} height={20} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
