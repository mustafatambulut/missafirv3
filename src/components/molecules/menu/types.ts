export interface IMenu {
  links: ILink;
  className?: string;
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
