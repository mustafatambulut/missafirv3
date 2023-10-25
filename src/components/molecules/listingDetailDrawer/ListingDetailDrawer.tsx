import React, { useRef, useState } from "react";
import classNames from "classnames";
import { get, includes } from "lodash";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";

import {
  BOOKING_DATE,
  BOOKING_GUESTS
} from "@/components/molecules/searchBar/constants";

import Button from "@/components/atoms/button/Button";
import DatePicker from "@/components/atoms/datePicker/DatePicker";

import PlusIcon from "../../../../public/images/plus.svg";
import MinusIcon from "../../../../public/images/minus.svg";
import ArrowLeftIcon from "../../../../public/images/arrow_left.svg";

const ListingDetailDrawer = ({
  bookingDate,
  setBookingDate,
  bookingGuests,
  setBookingGuests
}) => {
  const t = useTranslations();
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const [activeSearchItem, setActiveSearchItem] = useState(BOOKING_DATE);
  const showComponentByActivate = (item: string) => {
    return classNames("", {
      "block h-full": activeSearchItem === item,
      hidden: activeSearchItem !== item
    });
  };

  const hasSearchItemByActivate = includes(
    [BOOKING_GUESTS, BOOKING_DATE],
    activeSearchItem
  );

  const handleClickApply = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        setActiveSearchItem(BOOKING_GUESTS);
        break;
      case BOOKING_GUESTS:
        closeDrawer();
        break;
      default:
        break;
    }
  };

  const handleClickBack = () => {
    switch (activeSearchItem) {
      case BOOKING_GUESTS:
        setActiveSearchItem(BOOKING_DATE);
        break;
      default:
        break;
    }
  };

  const isActiveItemHasData = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return (
          get(bookingDate, "startDate") !== null &&
          get(bookingDate, "endDate") !== null
        );
      case BOOKING_GUESTS:
        return bookingGuests > 0;
    }
  };

  const skipButtonVisibility = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        if (
          get(bookingDate, "startDate") === null ||
          get(bookingDate, "endDate") === null
        ) {
          return false;
        } else {
          return true;
        }
      case BOOKING_GUESTS:
        return false;
    }
  };

  const backButtonVisibility = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        return false;
      case BOOKING_GUESTS:
        return true;
    }
  };

  const handleClear = () => {
    switch (activeSearchItem) {
      case BOOKING_DATE:
        setBookingDate({
          startDate: null,
          endDate: null
        });
        break;
      case BOOKING_GUESTS:
        setBookingGuests(1);
        break;
      default:
        break;
    }
  };

  const changeAdults = (type: string) => {
    if (type === "plus") {
      setBookingGuests(bookingGuests + 1);
    } else {
      bookingGuests > 0 && setBookingGuests(bookingGuests - 1);
    }
  };
  const closeDrawer = () => {
    if (drawerCloseRef && drawerCloseRef.current) {
      drawerCloseRef.current.checked = false;
    }
  };

  return (
    typeof window !== "undefined" &&
    isMobile &&
    createPortal(
      <div className="drawer z-50">
        <input
          ref={drawerCloseRef}
          id="msfr-listing-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="msfr-search-drawer"
            className="drawer-overlay"></label>
          <div className="p-3 w-full h-screen bg-white flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center p-2 mb-3 w-full">
              {backButtonVisibility() && (
                <div onClick={handleClickBack}>
                  <ArrowLeftIcon />
                </div>
              )}
              {skipButtonVisibility() && (
                <div
                  className="text-primary mr-2 ml-auto"
                  onClick={() => setActiveSearchItem(BOOKING_GUESTS)}>
                  {t("skip")}
                </div>
              )}
            </div>
            <div className={showComponentByActivate(BOOKING_DATE)}>
              <DatePicker
                daySize={50}
                isOpened={true}
                numberOfMonths={12}
                date={bookingDate}
                setDate={setBookingDate}
                orientation="verticalScrollable"
              />
            </div>
            <div className={showComponentByActivate(BOOKING_GUESTS)}>
              <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
                <div className="flex flex-col">
                  <span className="text-lg">{t("guests")}</span>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    ({t("over18")})
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className="border border-gray-800 rounded-full flex items-center justify-center"
                    onClick={() => changeAdults("minus")}>
                    <MinusIcon className="cursor-pointer" />
                  </div>
                  <span className="mx-2">{bookingGuests}</span>
                  <div
                    className="border border-gray-800 rounded-full flex items-center justify-center"
                    onClick={() => changeAdults("plus")}>
                    <PlusIcon className="cursor-pointer w-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hasSearchItemByActivate && (
            <section className="flex justify-end p-2 bg-white fixed lef-0 bottom-0 w-full">
              {hasSearchItemByActivate ? (
                <Button
                  onClick={handleClear}
                  variant="btn-link"
                  className="text-primary bg-transparent shadow-none border-none">
                  {t("clear")}
                </Button>
              ) : null}
              <Button
                onClick={handleClickApply}
                disabled={!isActiveItemHasData()}
                className="ml-2"
                variant="btn-primary">
                {t("apply")}
              </Button>
            </section>
          )}
        </div>
      </div>,
      window.document.body
    )
  );
};

export default ListingDetailDrawer;
