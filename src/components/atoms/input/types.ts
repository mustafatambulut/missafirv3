import { ReactNode } from "react";

export interface IInput {
  label?: string;
  className?: string;
  placeholder?: string;
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}
