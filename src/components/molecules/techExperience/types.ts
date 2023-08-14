export interface ITechExperience {
  id?: number;
  __component?: string;
  header?: Header;
  body?: Body[];
}

export interface Body {
  id?: number;
  title?: string;
  sliders?: Sliders;
}

export interface Sliders {
  data?: Slide[];
}

export interface Slide {
  id?: number;
  attributes?: Attributes;
}

export interface Attributes {
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
