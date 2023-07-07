export interface ISelectLanguage {
  id?: number;
  variant?: string;
  showIndicator?: boolean;
  languages: Languages;
}

export interface Languages {
  data: LanguagesData[];
}

export interface LanguagesData {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  image: string;
  label: string;
  link: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
