"use client";
import { createPortal } from "react-dom";

import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import { IProps } from "@/components/molecules/searchBar/types";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";

import DateDrawer from "@/components/atoms/dateDrawer/DateDrawer";
import GuestDrawer from "@/components/atoms/guestDrawer/GuestDrawer";
import SearchDrawer from "@/components/atoms/searchDrawer/SearchDrawer";
import MobileDrawerSide from "@/components/atoms/mobileDrawerSide/MobileDrawerSide";
import { useEffect } from "react";

const MobileSearchBar = (props: IProps) => {
  const {
    drawerCloseRef,
    bookingDate,
    isDrawerOpen,
    bookingGuests,
    bookingDestination,
    handleOpenDrawer,
    handleFilterListings
  } = props;

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  return (
    <>
      <div className="flex flex-col lg:flex-row rounded-2xl lg:bg-white w-full items-center lg:p-2 lg:h-20">
        <SearchDrawer
          destination={bookingDestination}
          onClick={() => handleOpenDrawer(BOOKING_DESTINATION)}
        />
        <DateDrawer
          booking={bookingDate}
          onClick={() => handleOpenDrawer(BOOKING_DATE)}
        />
        <GuestDrawer
          guest={bookingGuests}
          onClick={() => handleOpenDrawer(BOOKING_GUESTS)}
          handleFilterListings={handleFilterListings}
        />
      </div>
      {createPortal(
        <div className="drawer z-50">
          <input
            ref={drawerCloseRef}
            id="msfr-search-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content"></div>
          <MobileDrawerSide {...props} />
        </div>,
        document.getElementById("drawer-container")
      )}
    </>
  );
};

export default withSearchBar(MobileSearchBar);
