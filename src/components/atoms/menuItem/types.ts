export interface IMenuItem {
  linkClassName?: string;
  listClassName?: string;
  item: IItem | any;
  variant?: string;
}

export interface IItem {
  id: number;
  attributes?: Attributes;
}

export interface Attributes {
  order?: number;
  title?: string;
  url: string;
  target: string;
  createdAt?: string;
  updatedAt?: string;
  children?: Children;
}

export interface Children {
  data: any[];
}
