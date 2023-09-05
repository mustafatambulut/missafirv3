import { ReactNode } from "react";

export interface IMap {
  className?: string;
  children: ReactNode;
  width?: number;
  height?: number;
  rest?: any;
}
