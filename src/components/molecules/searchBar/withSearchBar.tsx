"use client";
import { useRef, useState } from "react";
import { get, isNull } from "lodash";
import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";
import {
  BOOKING_DATE,
  BOOKING_DESTINATION,
  BOOKING_GUESTS
} from "@/components/molecules/searchBar/constants";

const withSearchBar = (WrappedComponent) => {
  return (props) => {
    const [activeSearchItem, setActiveSearchItem] = useState<string>("");
    const [bookingDestination, setBookingDestination] = useState<string>("");
    const [skipButtonVisibility, setSkipButtonVisibility] =
      useState<boolean>(true);
    const [bookingDate, setBookingDate] = useState<IBookingDate>({
      startDate: null,
      endDate: null
    });
    const [bookingGuests, setBookingGuests] = useState<IBookingGuest>({
      adults: 0,
      kids: 0,
      pets: false
    });


    return (
      <div className="">
        {
          <WrappedComponent
            {...props}
            // drawerCloseRef={drawerCloseRef}
            bookingDate={bookingDate}
            bookingGuests={bookingGuests}
            activeSearchItem={activeSearchItem}
            bookingDestination={bookingDestination}
            skipButtonVisibility={skipButtonVisibility}
            setBookingDate={setBookingDate}
            setBookingGuests={setBookingGuests}
            setActiveSearchItem={setActiveSearchItem}
            setBookingDestination={setBookingDestination}
            setSkipButtonVisibility={setSkipButtonVisibility}
            // handleClearClick={handleClearClick}
            // handleApplyClick={handleApplyClick}
            // handleClickBackButton={handleClickBackButton}
            // handleClickSkipButton={handleClickSkipButton}
            // applyButtonDisabledStatus={applyButtonDisabledStatus}
            // clearButtonVisibilityStatus={clearButtonVisibilityStatus}
          />
        }
      </div>
    );
  };
};

export default withSearchBar;
