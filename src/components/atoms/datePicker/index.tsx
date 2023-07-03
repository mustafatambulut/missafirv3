"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { get } from "lodash";
import "react-dates/initialize";
import { DayPickerRangeController } from "react-dates";

import { isMobileView } from "@/utils/helper";
import { IBookingDate, IDatePicker } from "@/components/atoms/datePicker/types";

import Button from "@/components/atoms/button";

import "react-dates/lib/css/_datepicker.css";
import "./index.css";

import CalendarIcon from "../../../../public/images/calendar.svg";

const DatePicker = ({
  bookingDate,
  setBookingDate,
  setSkipButtonVisibility
}: IDatePicker) => {
  const initialMonth = moment();
  const [focusedInput, setFocusedInput] = useState<string | null>("startDate");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState<boolean>(true);

  const onDatesChange = ({ startDate, endDate }: IBookingDate) => {
    setBookingDate({ startDate, endDate });
  };

  const onFocusChange = (focusedInput: string | null) => {
    setFocusedInput(focusedInput);
  };

  const handleChangeMonth = (date: moment.Moment) => {
    setIsPrevButtonHidden(date.unix() === initialMonth.unix());
  };

  useEffect(() => {
    isMobileView() && setShowDatePicker(true);
  }, []);

  useEffect(() => {
    get(bookingDate, "startDate") && setSkipButtonVisibility(false);
  }, [bookingDate]);

  const renderControls = () => {
    return (
      <section className="w-full flex justify-end p-2 bg-white">
        <Button
          onClick={() => setBookingDate({ startDate: null, endDate: null })}
          variant="link"
          className="text-grey-600 bg-transparent shadow-none border-none">
          Clear
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDatePicker(false);
          }}
          className="ml-2"
          variant="primary">
          Done
        </Button>
      </section>
    );
  };

  return (
    <div
      className={`py-1 lg:px-4 h-full cursor-pointer w-full rounded-2xl relative  ${
        isPrevButtonHidden && "prev-hidden"
      } ${showDatePicker ? "lg:bg-grey-50" : "bg-white"}`}>
      <div
        className="lg:flex lg:items-center h-full"
        onClick={() => setShowDatePicker(true)}>
        <CalendarIcon className="hidden lg:block" />
        <div className="lg:flex lg:flex-col lg:ml-3 h-full">
          <span className="text-grey-600 text-left hidden lg:block">Dates</span>
          {!isMobileView() && (
            <>
              {get(bookingDate, "startDate") || get(bookingDate, "endDate") ? (
                <div className="flex text-grey-800">
                  <span>{get(bookingDate, "startDate")?.format("DD MMM")}</span>
                  <span className="mx-1">-</span>
                  <span>{get(bookingDate, "endDate")?.format("DD MMM")}</span>
                </div>
              ) : (
                <span className="text-grey-600">Choose date</span>
              )}
            </>
          )}
          {showDatePicker && (
            <div className="lg:absolute lg:top-20 lg:left-0 lg:z-20 w-full h-full">
              <DayPickerRangeController
                startDate={get(bookingDate, "startDate")}
                endDate={get(bookingDate, "endDate")}
                numberOfMonths={2}
                minDate={initialMonth}
                hideKeyboardShortcutsPanel
                focusedInput={focusedInput || "startDate"}
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                showKeyboardShortcuts={false}
                renderCalendarInfo={
                  !isMobileView()
                    ? get(bookingDate, "startDate") &&
                      get(bookingDate, "endDate") &&
                      renderControls
                    : null
                }
                noNavPrevButton={isPrevButtonHidden}
                onPrevMonthClick={handleChangeMonth}
                onNextMonthClick={handleChangeMonth}
                initialVisibleMonth={() => initialMonth}
                daySize={isMobileView() ? 50 : 39}
                onOutsideClick={() =>
                  !isMobileView() && setShowDatePicker(false)
                }
                orientation={
                  isMobileView() ? "verticalScrollable" : "horizontal"
                }
                transitionDuration={0}
                calendarInfoPosition="bottom"
                noNavButtons={isMobileView()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DatePicker;
