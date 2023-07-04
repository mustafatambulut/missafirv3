export interface IHeader {
  id: number
  logo: Logo
  userMenu: UserMenu
  buttons: Button[]
  languageMenu: LanguageMenu
}

export interface Logo {
  id: number
  image: string
  link: string
}

export interface UserMenu {
  id: number
  image: string
  user_links: UserLinks
}

export interface UserLinks {
  data: UserLinksData[]
}

export interface UserLinksData {
  id: number
  attributes: Attributes
}

export interface Attributes {
  image: string
  label: string
  link: string
  value: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Button {
  id: number
  label: string
  image: string
  link: string
}

export interface LanguageMenu {
  id: number
  languages: Languages
}

export interface Languages {
  data: LanguagesData[]
}

export interface LanguagesData {
  id: number
  attributes: LanguagesAttributes
}

export interface LanguagesAttributes {
  image: string
  label: string
  link: string
  value: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
