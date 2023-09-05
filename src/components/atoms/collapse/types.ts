import { ReactNode } from "react";

export interface ICollapse {
  className?: string;
  showIcon?: boolean;
  titleClass?: string;
  arrowColor?: string;
  contentClass?: string;
  showArrowIcon?: boolean;
  title: string | ReactNode;
  controlOutsideClick?: boolean;
  children: string | ReactNode;
}
