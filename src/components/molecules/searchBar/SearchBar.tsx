"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { IProps } from "@/components/molecules/searchBar/types";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";
import { updateBookingDate } from "@/redux/features/listingSlice/listingSlice";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";

import SearchIcon from "../../../../public/images/search.svg";

const SearchBar = (props: IProps) => {
  const {
    isDrawerOpen,
    setActiveSearchItem,
    handleFilterListings,
    setSkipButtonVisibility,
    isInCustomSection = false
  } = props;
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { bookingDate, loading, searchClicked } = useAppSelector(
    (state) => state.listingReducer
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      isDrawerOpen
        ? document.body.classList.add("overflow-hidden")
        : document.body.classList.remove("overflow-hidden");
    }
  }, [isDrawerOpen]);

  const handleChangeDate = (date: any) => dispatch(updateBookingDate(date));

  return (
    <>
      <div className="flex-1 mb-3 lg:mb-0 w-full lg:px-2">
        <DestinationSelect
          componentId="desktop-destination"
          isInCustomSection={isInCustomSection}
          setActiveSearchItem={setActiveSearchItem}
          setSkipButtonVisibility={setSkipButtonVisibility}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full lg:px-2">
        <DatePicker
          daySize={48}
          date={bookingDate}
          setDate={handleChangeDate}
          isInCustomSection={isInCustomSection}
          setSkipButtonVisibility={setSkipButtonVisibility}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full lg:pl-2">
        <div className="flex items-center justify-start">
          <Guests
            isInCustomSection={isInCustomSection}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
          <Button
            variant="btn-primary"
            disabled={(isInCustomSection && loading) || searchClicked}
            onClick={handleFilterListings}
            className={`disabled:bg-primary disabled:text-white disabled:cursor-not-allowed ${
              isInCustomSection
                ? "h-10 w-10 p-0 min-h-0 rounded-xl"
                : "h-14 w-[72px] lg:w-[5rem] rounded-2xl"
            } ml-3`}>
            {isMobile || isInCustomSection ? (
              <>
                {(isInCustomSection && loading) || searchClicked ? (
                  <span className="loading loading-spinner scale-75"></span>
                ) : (
                  <SearchIcon className="fill-white scale-75" />
                )}
              </>
            ) : (
              <>
                {(isInCustomSection && loading) || searchClicked ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span>{t("search")}</span>
                )}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default withSearchBar(SearchBar);
