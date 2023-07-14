import { JSX } from "react";

export interface ISelectMenu {
  props: Props;
  children?: JSX.Element | string | JSX.Element[];
}

export interface Props {
  selectProps: SelectProps;
}

export interface SelectProps {
  menuClassName?: string;
}
