import { IAllFiltersHeader } from "@/components/molecules/allFiltersHeader/types";

import CloseIcon from "../../../../public/images/close.svg";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const AllFiltersHeader = ({ modalButtonTrigger }: IAllFiltersHeader) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col sticky top-0 bg-white pt-5 px-5 z-10 w-full gap-y-3">
      <div className="flex justify-between items-center">
        <div className="text-primary-600 lg:text-gray-700 font-mi-sans-semi-bold text-xl lg:text-2xl">
          {/*<span className="hidden lg:inline-block mr-1">{t("all")}</span>*/}
          <Typography variant="h5" element="h5">{t("all_filters")}</Typography>
        </div>
        <div
          onClick={modalButtonTrigger}
          className="btn btn-sm btn-circle btn-ghost">
          <CloseIcon className="fill-gray-500" />
        </div>
      </div>
      {/*todo: istenirse, seçili olan filtreler buraya gelecek*/}
      {/*<SelectedFilters*/}
      {/*  filterData={filterData}*/}
      {/*  allFiltersData={allFiltersData}*/}
      {/*  setAllFiltersData={setAllFiltersData}*/}
      {/*  calculateMinMaxListingPrice={calculateMinMaxListingPrice}*/}
      {/*/>*/}
    </div>
  );
};

export default AllFiltersHeader;
