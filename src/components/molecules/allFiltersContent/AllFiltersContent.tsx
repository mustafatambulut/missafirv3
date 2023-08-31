"use client";
import { get, map } from "lodash";
import { useAppSelector } from "@/redux/hooks";

import FilterItem from "@/components/molecules/filterItem/FilterItem";

const AllFiltersContent = () => {
  const { filterItems } = useAppSelector((state) => state.listingReducer);
  return (
    <div className="mt-3 px-5">
      {map(filterItems, (item, index) => {
        if (get(item, "display") === "all" || get(item, "display") === "list") {
          return (
            <FilterItem key={index} filterItem={item} isInAllFilters={true} />
          );
        }
      })}
    </div>
  );
};
export default AllFiltersContent;
