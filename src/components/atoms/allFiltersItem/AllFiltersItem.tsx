import { IAllFiltersItem } from "@/components/atoms/allFiltersItem/types";

const AllFiltersItem = ({ children }: IAllFiltersItem) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default AllFiltersItem;
