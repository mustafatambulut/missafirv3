"use client";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import useFilter from "@/app/hooks/useFilter";
import { IFilterControlButtons } from "@/components/molecules/filterControlButtons/types";

import Button from "@/components/atoms/button/Button";
import {
  updateLoading,
  updateSearchClicked
} from "@/redux/features/listingSlice/listingSlice";

const FilterControlButtons = ({
  handleClear,
  closeModal = null,
  closeDropdown = null,
  isApplyDisabled = false,
  isClearDisabled = false,
  isInAllFilters = false
}: IFilterControlButtons) => {
  const { handleFilterListings } = useFilter();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const searchClicked = useAppSelector(
    (state) => state.listingReducer.searchClicked
  );

  const handleApplyFilter = () => {
    handleFilterListings();
    closeDropdown && closeDropdown();
    closeModal && closeModal();
  };

  const handleClickClear = () => {
    dispatch(updateLoading(true));
    dispatch(updateSearchClicked(true));
    handleClear ? handleClear() : null;
    closeDropdown && closeDropdown();
    closeModal && closeModal();
  };
  const renderButtons = () => {
    return (
      <Button
        disabled={isClearDisabled || searchClicked}
        onClick={handleClickClear}
        variant="btn-link"
        className="text-primary bg-transparent shadow-none border-none">
        {handleClear
          ? isInAllFilters
            ? t("clear_all")
            : t("clear")
          : "Cancel"}
      </Button>
    );
  };

  return (
    <div className="flex justify-end w-full mt-4">
      {renderButtons()}
      <Button
        disabled={searchClicked || isApplyDisabled}
        onClick={handleApplyFilter}
        className="ml-2"
        variant="btn-primary">
        <div>{t("show")}</div>
      </Button>
    </div>
  );
};

export default FilterControlButtons;
