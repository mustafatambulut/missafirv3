import { ReactNode } from "react";

export interface IToastMessage {
  toast: any;
  item: any;
  title?: string;
  children?: ReactNode;
  status: "success" | "warning" | "error";
  className?: string;
}
