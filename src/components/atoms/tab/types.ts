export interface ITab {
  className?: string;
  changeTab: void;
  tabs: Array<ITabItems>;
}

export interface ITabItems {
  title: string;
}
