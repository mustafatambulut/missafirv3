import { Header } from "@/app/pages/static/who-we-are/types";

export interface IDetailCards {
  lang: string;
  className?: string;
  header: Header;
  tabs: {
    title: string;
    id: number | string;
  };
}
