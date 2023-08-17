import { IAllFiltersHeader } from "@/components/molecules/allFiltersHeader/types";

import SelectedFilters from "@/components/molecules/selectedFilters/SelectedFilters";

import CloseIcon from "../../../../public/images/close.svg";

const AllFiltersHeader = ({
  filterData,
  allFiltersData,
  setAllFiltersData,
  modalButtonTrigger,
  calculateMinMaxListingPrice
}: IAllFiltersHeader) => {
  return (
    <div className="flex flex-col sticky top-0 bg-white pt-5 px-5 z-10 w-full gap-y-3">
      <div className="flex justify-between items-center">
        <div className="text-primary-600 lg:text-gray-700 font-mi-sans-semi-bold text-xl lg:text-2xl">
          <span className="hidden lg:inline-block">All</span>
          <span>Filters</span>
        </div>
        <div
          onClick={modalButtonTrigger}
          className="btn btn-sm btn-circle btn-ghost">
          <CloseIcon className="fill-gray-500" />
        </div>
      </div>
      <SelectedFilters
        filterData={filterData}
        allFiltersData={allFiltersData}
        setAllFiltersData={setAllFiltersData}
        calculateMinMaxListingPrice={calculateMinMaxListingPrice}
      />
    </div>
  );
};

export default AllFiltersHeader;
