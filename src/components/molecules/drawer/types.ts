import { IButton } from "@/components/atoms/button/types";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";
import { ISelectLanguage } from "@/components/atoms/selectLanguage/types";
import { ILink } from "@/components/molecules/menu/types";
import { IFooterMenu } from "@/components/molecules/footerMenu/types";

export interface IDrawer {
  data: IDrawerData;
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
