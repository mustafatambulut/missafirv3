import { ReactNode } from "react";

export interface IBanner {
  title: string | ReactNode;
  body: string | ReactNode;
  children?: ReactNode;
  type: "light" | "primary";
  className?: string;
  titleClass?: string;
  bodyClass?: string;
}
