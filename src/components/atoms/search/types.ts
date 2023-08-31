import { ReactNode } from "react";

export interface ISearch {
  value?: any;
  items: any[];
  searchId: string;
  className?: string;
  placeHolder?: string;
  onChange: () => void;
  controlTitle?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  showSearchIcon?: boolean;
  showOptionIcon?: boolean;
  noResultsMessage?: string;
  customIconPosition?: string;
  searchIconPosition?: string;
  menuIsOpen?: null | boolean;
  customIcon?: null | ReactNode;
  maxMenuHeight?: null | number;
  controlWrapperClassName?: string;
}
