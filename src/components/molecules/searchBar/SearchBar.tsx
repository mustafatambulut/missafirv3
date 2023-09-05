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
    setBookingDestination,
    setSkipButtonVisibility,
    setActiveSearchItem,
    handleFilterListings,
    setBookingDate,
    bookingDate,
    bookingGuests,
    setBookingGuests
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
          setActiveSearchItem={setActiveSearchItem}
          componentId="desktop-destination"
          setSkipButtonVisibility={setSkipButtonVisibility}
          setBookingDestination={setBookingDestination}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
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
            data={bookingGuests}
            setBookingGuests={setBookingGuests}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
          <Button
            onClick={handleFilterListings}
            variant="btn-primary"
            className="rounded-2xl !h-[56px] ml-3 w-[72px] lg:w-auto">
            {isMobile ? <SearchIcon /> : <span>Search</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default withSearchBar(SearchBar);
