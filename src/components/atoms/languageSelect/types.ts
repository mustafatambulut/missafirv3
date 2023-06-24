export interface ISelectLang {
  variant?: string;
  showIndicator?: boolean;
  languages: ILanguage[] | undefined;
}

export interface ILanguage {
  id: number;
  label: string;
  value: string;
  url: string | null;
  iconSrc: string;
}
