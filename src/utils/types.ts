export interface ILocation {
  param: Param;
}

export interface Param {
  ancestorOrigins?: AncestorOrigins;
  href?: string;
  origin?: string;
  protocol?: string;
  host?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
}

export interface AncestorOrigins {}
