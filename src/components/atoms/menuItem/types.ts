export interface IMenuItem {
  className?: string;
  linkClassName?: string;
  item: IItem;
  variant: string;
}

export interface IItem {
  link?: string;
  label?: string;
}
