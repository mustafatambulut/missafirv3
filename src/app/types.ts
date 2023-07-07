export type HomeTypes = body[];

export interface body {
  id: number;
  __component: string;
  image?: string;
  title?: string;
  header?: Header;
  cities?: Cities;
  body: any;
  footer?: Footer;
}

export interface Header {
  id: number;
  title: string;
  description: string;
}

export interface Cities {
  data: Daum[];
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Footer {
  id: number;
  title?: string;
  description?: string;
  label?: string;
  image?: string;
  link?: string;
}
