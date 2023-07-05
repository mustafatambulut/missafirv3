import React, { JSX } from "react";

export interface IButton {
  className?: string;
  variant?:
    | "btn-primary"
    | "btn-secondary"
    | "btn-square"
    | "btn-ghost"
    | "btn-link";
  children: JSX.Element | string | JSX.Element[];
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  disabled?: boolean;
  link?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  outline?: boolean;
}
