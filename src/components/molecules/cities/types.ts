export interface ICity {
  id?: number;
  __component?: string;
  header?: Header;
  cities?: Cities;
}

export interface Cities {
  data?: Data[];
}

export interface Data {
  id?: number;
  attributes?: Attributes;
}

export interface Attributes {
  title?: string;
  image?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

export interface Header {
  id?: number;
  title?: string;
  description?: string;
  image?: null;
}
