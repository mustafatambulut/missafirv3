import { IHeader } from "@/components/molecules/header/types";
import { IUserMenuData } from "@/components/atoms/userMenu/types";

export interface INavbar {
  data: Data;
  isScrolledHeaderActive: boolean;
  variant: "light" | "dark";
}

export interface Data {
  header: IHeader;
  userMenuData: IUserMenuData;
}
