import { ILink } from "@/components/molecules/menu/types";

export interface ISubMenu {
  name: string;
  isCollapsable: boolean;
  className?: string;
  items: ILink[];
  variant?: string;
}
