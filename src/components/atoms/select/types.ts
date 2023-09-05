import { ReactNode } from "react";

export interface ISelect {
  name?: string;
  value?: any;
  items: any[];
  searchId: string;
  className?: string;
  placeHolder?: string;
  iconOffset?: boolean;
  controlTitle?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  showPlaceholder: boolean,
  showControlTitle: boolean,
  showSearchIcon?: boolean;
  showOptionIcon?: boolean;
  noResultsMessage?: string;
  customIconPosition?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  searchIconPosition?: string;
  menuIsOpen?: null | boolean;
  customIcon?: null | ReactNode;
  maxMenuHeight?: null | number;

  searchIconColor?: string | null;
  controlWrapperClassName?: string;
  controlTitleClassName?: string | null;
  placeholderClassName?: string | null;
}
