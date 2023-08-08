import { ISelectLanguage } from "@/components/atoms/selectLanguage/types";
import { ILink } from "@/components/molecules/menu/types";
import { IButton } from "@/components/atoms/button/types";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";
import { IFooterMenu } from "@/components/molecules/footerMenu/types";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface IDrawer {
  drawerCloseRef: RefObject<HTMLInputElement>;
  data: IDrawerData;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IDrawerData {
  userMenuData: {
    buttons: IButton[];
    footerBrand: IFooterBrand;
    footerMenu: IFooterMenu;
    image: string;
    links: ILink[];
  };
  languages: ISelectLanguage[];
  links: ILink[];
}
