import {
  IBedsData,
  IBathroomsData
} from "@/components/molecules/bedAndBaths/types";

export interface IBedAndBathItem {
  data: string;
  bedsData: IBedsData;
  // eslint-disable-next-line no-unused-vars
  handleFilter: ({ type, value, title }: IBedsData | IBathroomsData) => void;
  bathroomsData: IBathroomsData;
  mockBedAndBathsData: { beds: IBedsData[]; bathrooms: IBathroomsData[] };
}
