/*eslint-disable*/
"use client";

import React, { useRef } from "react";
import { get, isNull } from "lodash";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";
import withSearchBar from "@/components/molecules/searchBar/withSearchBar";

import GuestsIcon from "../../../../public/images/guests.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import SearchIcon from "../../../../public/images/search-icon.svg";
import ArrowLeftIcon from "../../../../public/images/arrow-left.svg";
import SearchIconWhite from "../../../../public/images/search-white.svg";
import {
  BOOKING_DATE,
  BOOKING_DESTINATION, BOOKING_GUESTS
} from "@/components/molecules/searchBar/constants";

const MobileSearchBar = (props) => {
  const {
    bookingDate,
    bookingGuests,
    activeSearchItem,
    bookingDestination,
    setBookingDate,
    setBookingGuests,
    setActiveSearchItem,
    setBookingDestination,
    setSkipButtonVisibility,
    // handleClearClick,
    // handleApplyClick,
    // handleClickBackButton,
    skipButtonVisibility,
    // handleClickSkipButton,
    // applyButtonDisabledStatus,
    // clearButtonVisibilityStatus
  } = props;
  const drawerCloseRef = useRef<HTMLInputElement>(null);

  const handleDrawerClose = () => {
    drawerCloseRef.current?.click();
  };

  const handleClickBackButton = () => {
    switch (activeSearchItem) {
      case BOOKING_DESTINATION:
        handleDrawerClose();
        break;
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_DESTINATION);
        break;
      case BOOKING_GUESTS:
        setActiveSearchItem(BOOKING_DATE);
        break;
      default:
        break;
    }
  };


  const handleClickSkipButton = () => {
    switch (activeSearchItem) {
      case BOOKING_DESTINATION:
        setActiveSearchItem(BOOKING_DATE);
        break;
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_GUESTS);
        break;
      case BOOKING_GUESTS:
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  const handleClearClick = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        setBookingDate({
          startDate: null,
          endDate: null
        });
        break;
      case BOOKING_GUESTS:
        setBookingGuests({
          adults: 0,
          kids: 0,
          pets: false
        });
        break;
      default:
        break;
    }
  };

  const applyButtonDisabledStatus = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return (
          get(bookingDate, "startDate") == null ||
          get(bookingDate, "endDate") == null
        );
      case BOOKING_GUESTS:
        return get(bookingGuests, "adults") === 0;
      default:
        return false;
    }
  };

  const clearButtonVisibilityStatus = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return (
          !isNull(get(bookingDate, "startDate")) &&
          !isNull(get(bookingDate, "endDate"))
        );
      case BOOKING_GUESTS:
        return (
          get(bookingGuests, "adults") > 0 ||
          get(bookingGuests, "kids") > 0 ||
          get(bookingGuests, "pets")
        );
      default:
        return false;
    }
  };

  const handleApplyClick = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_GUESTS);
        break;
      case BOOKING_GUESTS:
        handleDrawerClose();
        break;
      default:
        break;
    }
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row rounded-2xl lg:bg-white w-full items-center lg:p-2 lg:h-20">
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          <label
            htmlFor="msfr-search-drawer"
            onClick={() => setActiveSearchItem("bookingDestination")}
            className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-600">
            {bookingDestination ? (
              <div className="ml-3">{get(bookingDestination, "label")}</div>
            ) : (
              <div className="ml-1 flex text-base">
                <SearchIcon className="mr-3" /> <span>Where?</span>
              </div>
            )}
          </label>
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          <label
            htmlFor="msfr-search-drawer"
            onClick={() => setActiveSearchItem("bookingDate")}
            className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-600">
            {get(bookingDate, "startDate") || get(bookingDate, "endDate") ? (
              <div className="ml-3">
                <div className="flex text-gray-800">
                  <span>{get(bookingDate, "startDate")?.format("DD MMM")}</span>
                  <span className="mx-1">-</span>
                  <span>{get(bookingDate, "endDate")?.format("DD MMM")}</span>
                </div>
              </div>
            ) : (
              <div className="ml-1 flex items-center text-base">
                <CalendarIcon className="mr-3" />
                <span>Dates</span>
              </div>
            )}
          </label>
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          <div className="flex">
            <label
              htmlFor="msfr-search-drawer"
              onClick={() => setActiveSearchItem("bookingGuests")}
              className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-600">
              {get(bookingGuests, "adults") > 0 ||
              get(bookingGuests, "kids") > 0 ||
              get(bookingGuests, "pets") ? (
                <div className="flex ml-3">
                  {get(bookingGuests, "adults") > 0 && (
                    <span className="mr-2">
                      {get(bookingGuests, "adults")} Adults
                    </span>
                  )}
                  {get(bookingGuests, "kids") > 0 && (
                    <span className="mr-2">
                      {get(bookingGuests, "kids")} Kids
                    </span>
                  )}
                  {get(bookingGuests, "pets") && (
                    <span className="mr-2">Pets</span>
                  )}
                </div>
              ) : (
                <div className="flex">
                  <div className="ml-1 flex items-center text-base">
                    <GuestsIcon className="mr-3" />
                    <span>Guests</span>
                  </div>
                </div>
              )}
            </label>
            <Button
              variant="btn-primary"
              className="rounded-2xl !h-[56px] ml-3 w-[72px] lg:w-auto">
              <SearchIconWhite />
            </Button>
          </div>
        </div>
      </div>
      <div className="drawer">
        <input
          ref={drawerCloseRef}
          id="msfr-search-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="msfr-search-drawer"
            className="drawer-overlay"></label>
          <div className="p-3 w-full min-h-full bg-white flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center p-2 mb-3">
              <div onClick={handleClickBackButton}>
                <ArrowLeftIcon />
              </div>
              {skipButtonVisibility && (
                <div
                  className="text-primary mr-2"
                  onClick={handleClickSkipButton}>
                  Skip
                </div>
              )}
            </div>
            <div
              className={
                activeSearchItem === "bookingDestination"
                  ? "block h-full"
                  : "hidden"
              }>
              <DestinationSelect
                setActiveSearchItem={setActiveSearchItem}
                componentId="mobile-destination"
                setSkipButtonVisibility={setSkipButtonVisibility}
                setBookingDestination={setBookingDestination}
              />
            </div>
            <div
              className={
                activeSearchItem === "bookingDate" ? "block h-full" : "hidden"
              }>
              <DatePicker
                bookingDate={bookingDate}
                setBookingDate={setBookingDate}
                setSkipButtonVisibility={setSkipButtonVisibility}
              />
            </div>
            <div
              className={
                activeSearchItem === "bookingGuests" ? "block h-full" : "hidden"
              }>
              <Guests
                data={bookingGuests}
                setBookingGuests={setBookingGuests}
              />
            </div>
            {(activeSearchItem === "bookingGuests" ||
              activeSearchItem === "bookingDate") && (
              <section className="w-full flex justify-end p-2 bg-white">
                {clearButtonVisibilityStatus() && (
                  <Button
                    onClick={handleClearClick}
                    variant="btn-link"
                    className="text-primary bg-transparent shadow-none border-none">
                    Clear
                  </Button>
                )}
                <Button
                  onClick={handleApplyClick}
                  disabled={applyButtonDisabledStatus()}
                  className="ml-2"
                  variant="btn-primary">
                  Apply
                </Button>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withSearchBar(MobileSearchBar);
