import { IAllFiltersContent } from "@/components/molecules/allFiltersContent/types";

import Concepts from "@/components/molecules/concepts/Concepts";
import Amenities from "@/components/molecules/amenities/Amenities";
import PriceRange from "@/components/molecules/priceRange/PriceRange";
import BedAndBaths from "@/components/molecules/bedAndBaths/BedAndBaths";
import AllFiltersItem from "@/components/atoms/allFiltersItem/AllFiltersItem";

const AllFiltersContent = ({
  filterData,
  setFilterData,
  allFiltersData,
  setAllFiltersData
}: IAllFiltersContent) => {
  return (
    <div className="flex flex-col gap-4 mt-3 px-5">
      <AllFiltersItem>
        <BedAndBaths
          showButtons={false}
          isInAllFilters={true}
          isTitleVisible={true}
          filterData={filterData}
          setFilterData={setFilterData}
          allFiltersData={allFiltersData}
          setAllFiltersData={setAllFiltersData}
        />
      </AllFiltersItem>
      <AllFiltersItem>
        <PriceRange
          isInAllFilters={true}
          isTitleVisible={true}
          filterData={filterData}
          setFilterData={setFilterData}
          allFiltersData={allFiltersData}
          setAllFiltersData={setAllFiltersData}
        />
      </AllFiltersItem>
      <AllFiltersItem>
        <Concepts
          showButtons={false}
          isInAllFilters={true}
          isTitleVisible={true}
          filterData={filterData}
          setFilterData={setFilterData}
          isDeleteButtonsVisible={false}
          allFiltersData={allFiltersData}
          setAllFiltersData={setAllFiltersData}
        />
      </AllFiltersItem>
      <AllFiltersItem>
        <Amenities
          isInAllFilters={true}
          isTitleVisible={true}
          filterData={filterData}
          setFilterData={setFilterData}
          allFiltersData={allFiltersData}
          setAllFiltersData={setAllFiltersData}
        />
      </AllFiltersItem>
    </div>
  );
};

export default AllFiltersContent;
