import { JSX } from "react";

export interface IFilterItem {
  dropdown?: JSX.Element[] | JSX.Element;
  children: JSX.Element[] | JSX.Element;
}
