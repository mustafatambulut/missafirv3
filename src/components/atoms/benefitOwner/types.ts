export interface IBenefitOwner {
  id?: number;
  __component?: string;
  header?: Header;
  body?: Header[];
}

export interface Header {
  id?: number;
  image?: null | string;
  title?: string;
  description?: string;
}
