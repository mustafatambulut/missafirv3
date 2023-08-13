import {
  IPriceRangeData,
  IPriceRangeChangeData
} from "@/components/molecules/priceRange/types";

export interface IPriceRangeInputs {
  priceRangeData: IPriceRangeData;
  // eslint-disable-next-line no-unused-vars
  handleInput: (e: IPriceRangeChangeData) => IPriceRangeData | undefined;
}

export interface IChange {
  formattedValue: string;
  value: string;
  floatValue: number;
}
