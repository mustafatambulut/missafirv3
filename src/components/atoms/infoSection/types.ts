export interface IInfoSection {
  info?: IInfoSectionData[];
  collapsable?: boolean;
}

export interface IInfoSectionData {
  header: string;
  body: string;
}
