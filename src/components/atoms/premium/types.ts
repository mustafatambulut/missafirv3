export interface IPremium {
  id?: number;
  __component?: string;
  header?: Body;
  body?: Body;
  footer?: Footer;
}

export interface Body {
  id?: number;
  title?: string;
  image?: null | string;
  description?: string;
}

export interface Footer {
  id?: number;
  label?: string;
  image?: string;
  link?: string;
}
