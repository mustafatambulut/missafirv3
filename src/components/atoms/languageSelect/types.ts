export interface ILanguageSelect {
  id: number;
  image: any;
  links: ILanguageSelectLinks;
  variant?: string;
  showIndicator?: boolean;
}

export interface ILanguageSelectLinks {
  data: ILanguageSelectData[];
}

export interface ILanguageSelectData {
  id: number;
  attributes: ILanguageSelectAttributes;
}

export interface ILanguageSelectAttributes {
  label: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
  image: string;
  value: string;
}
