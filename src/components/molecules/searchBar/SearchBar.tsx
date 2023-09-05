/*eslint-disable*/
"use client";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { IProps } from "@/components/molecules/searchBar/types";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";

import SearchIcon from "../../../../public/images/search.svg";
import RenderControl from "@/components/atoms/renderControl/RenderControl";

const SearchBar = (props: IProps) => {
  const {
    isDrawerOpen,
    setActiveSearchItem,
    handleFilterListings,
    setSkipButtonVisibility,
    isInCustomSection = false
  } = props;
  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  return (
    <>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <DestinationSelect
          componentId="desktop-destination"
          isInCustomSection={isInCustomSection}
          setActiveSearchItem={setActiveSearchItem}
          setSkipButtonVisibility={setSkipButtonVisibility}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <DatePicker
          isInCustomSection={isInCustomSection}
          setSkipButtonVisibility={setSkipButtonVisibility}
        />
        {/*todo: datepicker sorunu çözülecek*/}
        {/*<DatePicker*/}
        {/*  numberOfMonths={2}*/}
        {/*  noNavButtons={isMobile}*/}
        {/*  // bookingDate={bookingDate}*/}
        {/*  // setBookingDate={setBookingDate}*/}
        {/*  setSkipButtonVisibility={setSkipButtonVisibility}*/}
        {/*/>*/}
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <div className="flex items-center justify-start">
          <Guests
            isInCustomSection={isInCustomSection}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
          <Button
            variant="btn-primary"
            onClick={handleFilterListings}
            className={`${
              isInCustomSection
                ? "h-10 w-10 p-0 min-h-0 rounded-xl"
                : "h-14 w-[72px] lg:w-auto rounded-2xl"
            } ml-3`}>
            {isMobile || isInCustomSection ? (
              <SearchIcon className="fill-white scale-75" />
            ) : (
              <span>Search</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default withSearchBar(SearchBar);
