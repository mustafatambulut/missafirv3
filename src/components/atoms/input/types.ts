import { ReactNode } from "react";

export interface IInput {
  name: string;
  value: string;
  label?: string;
  className?: string;
  placeholder?: string;
  containerClassName?: string;
  isDisable?: boolean;
  onChange?: void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: "text" | "email" | "phone" | "password" | "tel";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}
