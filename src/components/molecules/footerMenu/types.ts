import { MenuLinks } from "@/components/atoms/footerBrand/types";

export interface IFooterMenu {
  items: Items;
  className?: string;
}

export interface Items {
  title: string;
  menu_links: MenuLinks;
}
