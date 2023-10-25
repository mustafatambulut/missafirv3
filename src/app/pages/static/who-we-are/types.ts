import { ReactNode } from "react";

export interface IWhoWeAreLayout {
  children: ReactNode;
}

export interface IWhoWeAre {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  header: Header;
  body: Body;
  Footer: Footer;
}

export interface Footer {
  id: number;
  bannerHeader: Header;
  bannerBody: Header;
  bannerFooter: BannerFooter;
}

export interface Header {
  id: number;
  title: null | string;
  description: null | string;
  image?: null;
  members?: Members;
  subTitle?: string;
}

export interface Members {
  data: MembersDatum[];
}

export interface MembersDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  image: string;
  fullname: string;
  position: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  id: number;
}

export interface BannerFooter {
  id: number;
  label: string;
  image: null;
  link: null;
}

export interface Body {
  id: number;
  sliders: Sliders;
  content: Header;
  aboutUs: AboutUs;
  brands: Brands;
  firstTeam: Header;
  allTeam: Header;
}

export interface AboutUs {
  id: number;
  title: string;
  sliders: Sliders;
}

export interface Sliders {
  data: SlidersDatum[];
}

export interface SlidersDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  image: string;
  description: null | string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Brands {
  id: number;
  sliders: Sliders;
}

export interface Meta {
}

