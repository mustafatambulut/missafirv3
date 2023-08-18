"use client";
import { useRef, useState } from "react";

import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";

const withSearchBar = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const drawerCloseRef = useRef<HTMLInputElement>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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

    const handleOpenDrawer = (searchItem) => {
      setIsDrawerOpen((v) => !v);
      setActiveSearchItem(searchItem);
    };

    const handleFilterListings = () => {
      const filterObject = {
        districtId: bookingDestination?.value || "",
        checkIn: bookingDate.startDate?.format("YYYY-MM-DD") || "",
        checkOut: bookingDate.endDate?.format("YYYY-MM-DD") || "",
        adults: bookingGuests.adults,
        kids: bookingGuests.kids,
        pets: Number(bookingGuests.pets)
      };
      alert(JSON.stringify(filterObject));
    };

    return (
      <div className="flex flex-col lg:flex-row rounded-2xl lg:bg-white w-full items-center lg:p-2 lg:h-[72px]">
        {
          <WrappedComponent
            {...props}
            drawerCloseRef={drawerCloseRef}
            bookingDate={bookingDate}
            isDrawerOpen={isDrawerOpen}
            bookingGuests={bookingGuests}
            activeSearchItem={activeSearchItem}
            bookingDestination={bookingDestination}
            skipButtonVisibility={skipButtonVisibility}
            setBookingDate={setBookingDate}
            setIsDrawerOpen={setIsDrawerOpen}
            setBookingGuests={setBookingGuests}
            handleOpenDrawer={handleOpenDrawer}
            setActiveSearchItem={setActiveSearchItem}
            handleFilterListings={handleFilterListings}
            setBookingDestination={setBookingDestination}
            setSkipButtonVisibility={setSkipButtonVisibility}
          />
        }
      </div>
    );
  };
};

export default withSearchBar;
