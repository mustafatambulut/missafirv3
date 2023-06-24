export interface IMenu {
  links: ILink[] | undefined;
  className?: string;
  isCollapsable: boolean;
}

export interface ILink {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  order: number;
  title: string;
  url: string;
  target: string;
  createdAt: string;
  updatedAt: string;
  children: Children;
}

export interface Children {
  data: any[];
}
