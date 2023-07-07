export interface IFooterBrand {
  id: number;
  __component: string;
  header: Header;
  body: Body;
}

export interface Header {
  id: number;
  title: string;
  description: string;
}

export interface Body {
  id: number;
  menu_links: MenuLinks;
}

export interface MenuLinks {
  data: MenuLinksData[];
}

export interface MenuLinksData {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  label: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type FooterBrandProps = {
  className?: string;
};
