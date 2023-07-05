import { ILink } from "@/components/molecules/menu/types";

export interface ISubMenu {
  name: string;
  isCollapsable: boolean;
  items: ILink[];
  variant?: string;
}
