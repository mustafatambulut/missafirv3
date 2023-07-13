import React, { JSX } from "react";

export interface IButton {
  target?: "_blank" | "_parent" | "_self" | "_top";
  variant?:
    | "btn-primary"
    | "btn-secondary"
    | "btn-square"
    | "btn-ghost"
    | "btn-link";
  children: JSX.Element | string | JSX.Element[];
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  link?: string;
  className?: string;
  isRtl?: boolean;
  outline?: boolean;
  disabled?: boolean;
}
