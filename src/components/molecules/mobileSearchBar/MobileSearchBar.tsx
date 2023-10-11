"use client";
import { useEffect } from "react";
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
import { isMobile } from "react-device-detect";

const MobileSearchBar = (props: IProps) => {
  const {
    isDrawerOpen,
    drawerCloseRef,
    handleOpenDrawer,
    handleFilterListings,
    isInCustomSection = false,
    bookingDate
  } = props;

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  return (
    <>
      <div
        className={`flex ${
          isInCustomSection
            ? "flex-row p-1 justify-between gap-x-1"
            : "flex-col"
        } rounded-2xl lg:bg-white w-full items-center`}>
        <SearchDrawer
          isInCustomSection={isInCustomSection}
          onClick={() => handleOpenDrawer(BOOKING_DESTINATION)}
        />
        <DateDrawer
          isInCustomSection={isInCustomSection}
          booking={bookingDate}
          onClick={() => handleOpenDrawer(BOOKING_DATE)}
        />
        <GuestDrawer
          onClick={() => handleOpenDrawer(BOOKING_GUESTS)}
          handleFilterListings={handleFilterListings}
          isInCustomSection={isInCustomSection}
        />
      </div>
      {(typeof window !== "undefined" && isMobile) &&
        createPortal(
          <div className="drawer z-50">
            <input
              ref={drawerCloseRef}
              id="msfr-search-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content"></div>
            <MobileDrawerSide
              {...props}
              isInCustomSection={isInCustomSection}
            />
          </div>,
          document.getElementById("drawer-container")
        )}
    </>
  );
};

export default withSearchBar(MobileSearchBar);
