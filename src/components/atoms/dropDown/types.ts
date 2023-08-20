import { ReactNode } from "react";

export interface IDropDown {
  label?: string;
  children?: ReactNode;
  imageSrc?: string;
  className?: string;
  menuClass?: string;
  isScrolledHeaderActive?: boolean;
}
