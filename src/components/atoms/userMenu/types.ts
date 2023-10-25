import { Body } from "@/components/molecules/footer/types";
import { Button } from "@/components/molecules/header/types";
import { IFooterBrand } from "@/components/atoms/footerBrand/types";

export interface IUserMenu {
  lang?: string;
  id?: number;
  variant?: "dark" | "gray" | "ghost" | "light" | "";
  data: Data;
  isScrolledHeaderActive?: boolean;
}

export interface Data {
  image?: string;
  footerMenu: Body;
  buttons?: Button[] | null;
  links: IUserMenuLinks;
  footerBrand: IFooterBrand;
}

export interface IUserMenuLinks {
  data: IUserMenuData[];
}

export interface IUserMenuData {
  id: number;
  attributes: IUserMenuAttributes;
}

export interface IUserMenuAttributes {
  label: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
  image: any;
  value: any;
}
