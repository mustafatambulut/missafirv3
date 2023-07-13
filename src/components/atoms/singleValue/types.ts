export interface ISingleValue {
  props: Props;
}

export interface Props {
  data: Data;
  selectProps: SelectProps;
}

export interface SelectProps {
  singleValueClassName?: string;
  imageWidthClassName?: string;
  imageShow?: boolean;
  selectTitle?: string;
  singleValueChildrenClassName?: string;
}

export interface Data {
  attributes: Attributes;
}

export interface Attributes {
  image?: string;
  label?: string;
}
