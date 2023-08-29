import { IContactInfo } from "@/components/atoms/contactInfo/types";

export interface IContactState {
  header?: Header;
  formItems?: FormItem[];
  contactInfo?: IContactInfo[];
  banner: {
    formItems?: FormItem[];
    title?: Header;
    description?: Header;
  };
  isSend: boolean;
}

export interface Header {
  title?: string;
  description?: string;
}

export interface FormItem {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
}
