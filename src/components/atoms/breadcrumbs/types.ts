export interface IBreadcrumbs {
  className?: string;
  listClass?: string;
  items: IItems[];
}

export interface IItems {
  url?: string;
  label: string;
}
