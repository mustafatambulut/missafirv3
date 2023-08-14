import { ReactNode } from "react";

export interface ILoading {
  isLoading: boolean;
  children: ReactNode;
  loader: ReactNode;
}
