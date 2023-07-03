import React, { JSX } from "react";

export interface IButton {
  className?: string;
  variant?: "primary" | "secondary" | "square" | "ghost";
  children: JSX.Element | string | JSX.Element[];
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  disabled?: boolean;
  link?: string;
}
