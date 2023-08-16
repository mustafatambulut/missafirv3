"use client";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { IProps } from "@/components/molecules/searchBar/types";
import { IBookingDate } from "@/components/atoms/datePicker/types";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";

import SearchIcon from "../../../../public/images/search.svg";

const SearchBar = (props: IProps) => {
  const {
    isDrawerOpen,
    setBookingDestination,
    setSkipButtonVisibility,
    handleOpenDrawer
  } = props;

  const [bookingDate, setBookingDate] = useState<IBookingDate>({
    startDate: null,
    endDate: null
  });
  const [bookingGuests, setBookingGuests] = useState({
    adults: 0,
    kids: 0,
    pets: false
  });

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  return (
    <>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <DestinationSelect
          setActiveSearchItem={handleOpenDrawer}
          componentId="desktop-destination"
          setSkipButtonVisibility={setSkipButtonVisibility}
          setBookingDestination={setBookingDestination}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <DatePicker
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          setSkipButtonVisibility={setSkipButtonVisibility}
        />
      </div>
      <div className="flex-1 mb-3 lg:mb-0 w-full">
        <div className="flex items-center justify-start">
          <Guests
            data={bookingGuests}
            setBookingGuests={setBookingGuests}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
          <Button
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
