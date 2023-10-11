import { ReactNode } from "react";

export interface ITypography {
  variant:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h4.1"
  | "h5"
  | "h5.1"
  | "h6"
  | "h6.1"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "p6";
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  children: ReactNode | ReactNode[];
  className?: string;
  onClick?: () => void;
}
