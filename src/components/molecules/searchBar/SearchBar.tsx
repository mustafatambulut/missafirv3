"use client";
import React, { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { createPortal } from "react-dom";
import { isMobile } from "react-device-detect";

import { IBookingDate } from "@/components/atoms/datePicker/types";

import Guests from "@/components/atoms/guests/Guests";
import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";
import DestinationSelect from "@/components/atoms/destinationSelect/DestinationSelect";

import GuestsIcon from "../../../../public/images/guests.svg";
import SearchIcon from "../../../../public/images/search.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import ArrowLeftIcon from "../../../../public/images/chevron_left.svg";
import SearchIconWhite from "../../../../public/images/search_white.svg";

const SearchBar = () => {
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSearchItem, setActiveSearchItem] = useState("");
  const [bookingDestination, setBookingDestination] = useState("");
  const [skipButtonVisibility, setSkipButtonVisibility] = useState(true);
  const [bookingDate, setBookingDate] = useState<IBookingDate>({
    startDate: null,
    endDate: null
  });
  const [bookingGuests, setBookingGuests] = useState({
    adults: 0,
    kids: 0,
    pets: false
  });
  const handleDrawerClose = () => {
    drawerCloseRef.current?.click();
    setIsDrawerOpen(false);
  };

  const handleClickBackButton = () => {
    switch (activeSearchItem) {
      case "bookingDestination":
        handleDrawerClose();
        break;
      case "bookingDate":
        setActiveSearchItem("bookingDestination");
        break;
      case "bookingGuests":
        setActiveSearchItem("bookingDate");
        break;
      default:
        break;
    }
  };

  const handleClickSkipButton = () => {
    switch (activeSearchItem) {
      case "bookingDestination":
        setActiveSearchItem("bookingDate");
        break;
      case "bookingDate":
        setActiveSearchItem("bookingGuests");
        break;
      case "bookingGuests":
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  const handleClearClick = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        setBookingDate({
          startDate: null,
          endDate: null
        });
        break;
      case "bookingGuests":
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
      case "bookingDate":
        return (
          get(bookingDate, "startDate") == null ||
          get(bookingDate, "endDate") == null
        );
      case "bookingGuests":
        return get(bookingGuests, "adults") === 0;
      default:
        return false;
    }
  };

  const clearButtonVisibilityStatus = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        return (
          get(bookingDate, "startDate") !== null &&
          get(bookingDate, "endDate") !== null
        );
      case "bookingGuests":
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
      case "bookingDate":
        setActiveSearchItem("bookingGuests");
        break;
      case "bookingGuests":
        handleDrawerClose();
        break;
      default:
        break;
    }
  };
  const handleOpenDrawer = (searchItem) => {
    setIsDrawerOpen((v) => !v);
    setActiveSearchItem(searchItem);
  };

  useEffect(() => {
    isDrawerOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpen]);

  return (
    <>
      <div className="flex flex-col lg:flex-row rounded-2xl lg:bg-white w-full items-center lg:p-2 lg:h-[72px]">
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobile ? (
            <label
              htmlFor="msfr-search-drawer"
              onClick={() => handleOpenDrawer("bookingDestination")}
              className="drawer-button py-1 px-4 !h-[58px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700">
              <div className="ml-1 flex items-center text-base">
                <SearchIcon className="mr-3" />
                <div className="flex flex-col items-start">
                  <span>Where?</span>
                  {bookingDestination && (
                    <div className="text-lg font-mi-sans-semi-bold">
                      {get(bookingDestination, "label")}
                    </div>
                  )}
                </div>
              </div>
            </label>
          ) : (
            <DestinationSelect
              setActiveSearchItem={handleOpenDrawer}
              componentId="desktop-destination"
              setSkipButtonVisibility={setSkipButtonVisibility}
              setBookingDestination={setBookingDestination}
            />
          )}
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobile ? (
            <label
              htmlFor="msfr-search-drawer"
              onClick={() => handleOpenDrawer("bookingDate")}
              className="drawer-button py-1 px-4 !h-[58px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700">
              <div className="flex items-center text-base">
                <CalendarIcon className="mr-3 fill-gray-800" />
                <div className="flex flex-col items-start">
                  <span>Dates</span>
                  {(get(bookingDate, "startDate") ||
                    get(bookingDate, "endDate")) && (
                    <div className="text-lg font-mi-sans-semi-bold">
                      <div className="flex text-gray-700">
                        <span>
                          {get(bookingDate, "startDate")?.format("DD MMM")}
                        </span>
                        <span className="mx-1">-</span>
                        <span>
                          {get(bookingDate, "endDate")?.format("DD MMM")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </label>
          ) : (
            <DatePicker
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              setSkipButtonVisibility={setSkipButtonVisibility}
            />
          )}
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobile ? (
            <div className="flex">
              <label
                htmlFor="msfr-search-drawer"
                onClick={() => handleOpenDrawer("bookingGuests")}
                className="drawer-button py-1 px-4 !h-[58px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700">
                <div className="flex">
                  <div className="flex items-center text-base">
                    <GuestsIcon className="mr-3" />
                    <div className="flex flex-col items-start">
                      <span>Guests</span>
                      {(get(bookingGuests, "adults") > 0 ||
                        get(bookingGuests, "kids") > 0 ||
                        get(bookingGuests, "pets")) && (
                        <div className="flex text-lg font-mi-sans-semi-bold">
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
                      )}
                    </div>
                  </div>
                </div>
              </label>
              <Button
                variant="btn-primary"
                className="rounded-2xl !h-[58px] ml-3 w-[72px] lg:w-auto">
                <SearchIconWhite />
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {isMobile &&
        createPortal(
          <div className="drawer z-50">
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
                    <ArrowLeftIcon className="fill-gray-600" />
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
                    setActiveSearchItem={handleOpenDrawer}
                    componentId="mobile-destination"
                    setSkipButtonVisibility={setSkipButtonVisibility}
                    setBookingDestination={setBookingDestination}
                  />
                </div>
                <div
                  className={
                    activeSearchItem === "bookingDate"
                      ? "block h-full"
                      : "hidden"
                  }>
                  <DatePicker
                    bookingDate={bookingDate}
                    setBookingDate={setBookingDate}
                    setSkipButtonVisibility={setSkipButtonVisibility}
                  />
                </div>
                <div
                  className={
                    activeSearchItem === "bookingGuests"
                      ? "block h-full"
                      : "hidden"
                  }>
                  <Guests
                    data={bookingGuests}
                    setBookingGuests={setBookingGuests}
                    setSkipButtonVisibility={setSkipButtonVisibility}
                  />
                </div>
              </div>
              {(activeSearchItem === "bookingGuests" ||
                activeSearchItem === "bookingDate") && (
                <section className="flex justify-end p-2 bg-white fixed lef-0 bottom-0 w-full">
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
          </div>,
          document.getElementById("drawer-container")
        )}
    </>
  );
};

export default SearchBar;
