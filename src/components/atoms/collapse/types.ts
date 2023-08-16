import { ReactNode } from "react";

export interface ICollapse {
  className?: string;
  titleClass?: string;
  arrowColor?: string;
  contentClass?: string;
  title: string | ReactNode;
  children: string | ReactNode;
}
