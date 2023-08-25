import { IContactInfo } from "@/components/atoms/contactInfo/types";

export interface IContactState {
  header?: Header;
  contactInfo?: IContactInfo[];
}

export interface Header {
  title?: string;
  description?: string;
}
