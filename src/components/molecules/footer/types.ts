export interface IFooter {
  footer: Footer[];
}

export interface Footer {
  id: number;
  __component: string;
  header: Header;
  body: Body;
  footer: SubFooter;
}

export interface Header {
  id: number;
  image: string;
  description: string;
  buttonImage: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface Body {
  id: number;
  menu_links: MenuLinks;
}

export interface MenuLinks {
  data: MenuLinkData[];
}

export interface MenuLinkData {
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

export interface SubFooter {
  id: number;
  footer_links: FooterLinks;
}

export interface FooterLinks {
  data: FooterLinksData[];
}

export interface FooterLinksData {
  id: number;
  attributes: FooterLinksAttributes;
}

export interface FooterLinksAttributes {
  image: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
