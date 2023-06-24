import { ILanguage } from "@/components/atoms/languageSelect/types";

export interface INavbar {
  navbarItems: INavbarItems | undefined;
}

export interface INavbarItems {
  logo: ILogo;
  button: Button;
  languages: ILanguage[];
}

export interface ILogo {
  data: IData;
}

export interface IData {
  id: number;
  attributes: IAttributes;
}

export interface IAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Button {
  id: number;
  label: string;
  url: string;
  iconSrc: any;
}
