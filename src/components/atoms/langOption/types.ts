export interface IOption {
  props: Props;
}

export interface Props {
  data: Data;
  selectProps: SelectProps;
}

export interface SelectProps {
  optionClassName?: string;
}

export interface Data {
  attributes: Attributes;
}

export interface Attributes {
  image?: string;
  label?: string;
}
