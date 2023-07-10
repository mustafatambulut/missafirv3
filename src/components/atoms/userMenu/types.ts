import { Body } from "@/components/molecules/footer/types";
import { Button } from "@/components/molecules/header/types";

export interface IUserMenu {
  id?: number;
  variant: string;
  data: Data;
}

export interface Data {
  image?: string;
  footerMenu: Body;
  buttons?: Button[] | null;
  links: IUserMenuLinks;
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
