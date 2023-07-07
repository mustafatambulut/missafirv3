export interface IMenu {
  links: ILink;
  className?: string;
  isCollapsable?: boolean;
  variant?: "default" | "footer" | "header";
}

export interface ILink {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  label?: string;
  title?: string;
  url?: string;
  link?: string;
  children?: Children;
}

export interface Children {
  data: any[];
}
