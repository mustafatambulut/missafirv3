import { ILanguageSelect } from "@/components/atoms/languageSelect/types";
import { IUserMenu } from "@/components/atoms/userMenu/types";

export interface INavbar {
  logo: ILogo;
  button: INavbarButton[];
  langMenu: ILanguageSelect;
  userMenu: IUserMenu;
}

export interface ILogo {
  id: number;
  link: string;
  image: string;
}

export interface INavbarButton {
  id: number;
  image: string;
  label: string;
  link: string;
}
