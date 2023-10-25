"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";

const SearchDrawer = dynamic(
  () => import("@/components/atoms/searchDrawer/SearchDrawer"),
  {
    ssr: false
  }
);

const DateDrawer = dynamic(
  () => import("@/components/atoms/dateDrawer/DateDrawer"),
  {
    ssr: false
  }
);

const GuestDrawer = dynamic(
  () => import("@/components/atoms/guestDrawer/GuestDrawer"),
  {
    ssr: false
  }
);

import {
  BOOKING_DATE,
  BOOKING_GUESTS,
  BOOKING_DESTINATION
} from "@/components/molecules/searchBar/constants";
import { IProps } from "@/components/molecules/searchBar/types";

import MobileDrawerSide from "@/components/atoms/mobileDrawerSide/MobileDrawerSide";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";

const MobileSearchBar = (props: IProps) => {
  const {
    isDrawerOpen,
    drawerCloseRef,
    handleOpenDrawer,
    handleFilterListings,
    isInCustomSection = false,
    bookingDate
  } = props;

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

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
      {typeof window !== "undefined" &&
        isMobileDevice &&
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
