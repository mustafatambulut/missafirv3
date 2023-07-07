import { JSX } from "react";

export interface IDropdownIndicator {
  props: Props;
  showIndicator?: boolean;
}

export interface Props {
  children: JSX.Element | string | JSX.Element[];
}
