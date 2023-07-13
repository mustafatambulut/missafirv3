export interface IMenu {
  links: ILink[];
  className?: string;
  subMenuClass?: string;
  menuItemClass?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  children?: Children;
}

export interface Children {
  data: any[];
}
