import { ReactNode } from "react";

export interface IAlert {
  title?: string;
  className?: string;
  variant: "success" | "danger" | "warning" | "info";
  icon: ReactNode;
  onClick?: () => void;
}
