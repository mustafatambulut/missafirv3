import { IConceptsData } from "@/components/molecules/concepts/types";

export interface IConceptItem {
  data: IConceptsData;
  concepts: IConceptsData[];
  // eslint-disable-next-line no-unused-vars
  handleFilter: ({ value, title }: IConceptsData) => void;
  isInAllFilters: boolean;
  // eslint-disable-next-line no-unused-vars
  checkIsIncludes: (data: IConceptsData[], value: string) => boolean;
  isDeleteButtonsVisible: boolean;
}
