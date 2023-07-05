"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { get } from "lodash";
import "react-dates/initialize";
import { DayPickerRangeController } from "react-dates";

import { isMobileView } from "@/utils/helper";
import { IBookingDate, IDatePicker } from "@/components/atoms/datePicker/types";

import Button from "@/components/atoms/button/Button";

import "react-dates/lib/css/_datepicker.css";
import "./DatePicker.css";

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
    setIsPrevButtonHidden(
      date.format("YYYY/MM/DD") === initialMonth.format("YYYY/MM/DD")
    );
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
          variant="btn-link"
          className="text-gray-600 bg-transparent shadow-none border-none">
          Clear
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDatePicker(false);
          }}
          className="ml-2"
          variant="btn-primary">
          Done
        </Button>
      </section>
    );
  };

  return (
    <div
      className={`py-1 lg:px-4 lg:h-[56px] cursor-pointer w-full rounded-2xl relative  ${
        isPrevButtonHidden && "prev-hidden"
      } ${showDatePicker ? "lg:bg-gray-50" : "bg-white"}`}>
      <div
        className="lg:flex lg:items-center h-full"
        onClick={() => setShowDatePicker(true)}>
        <CalendarIcon className="hidden lg:block" />
        <div className="lg:flex lg:flex-col lg:ml-3 h-full lg:justify-center">
          <span className="text-gray-600 text-left hidden lg:block lg:text-21">
            Dates
          </span>
          {!isMobileView() && (
            <>
              {get(bookingDate, "startDate") || get(bookingDate, "endDate") ? (
                <div className="flex text-gray-800">
                  <span>{get(bookingDate, "startDate")?.format("DD MMM")}</span>
                  <span className="mx-1">-</span>
                  <span>{get(bookingDate, "endDate")?.format("DD MMM")}</span>
                </div>
              ) : (
                <span className="text-gray-600 block lg:hidden">
                  Choose date
                </span>
              )}
            </>
          )}
          {showDatePicker && (
            <div className="lg:absolute lg:top-20 lg:left-0 lg:z-20 w-full h-full">
              <DayPickerRangeController
                numberOfMonths={2}
                transitionDuration={0}
                minDate={initialMonth}
                hideKeyboardShortcutsPanel
                calendarInfoPosition="bottom"
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                showKeyboardShortcuts={false}
                noNavButtons={isMobileView()}
                daySize={isMobileView() ? 50 : 39}
                onPrevMonthClick={handleChangeMonth}
                onNextMonthClick={handleChangeMonth}
                noNavPrevButton={isPrevButtonHidden}
                initialVisibleMonth={() => initialMonth}
                endDate={get(bookingDate, "endDate")}
                focusedInput={focusedInput || "startDate"}
                startDate={get(bookingDate, "startDate")}
                renderCalendarInfo={
                  !isMobileView()
                    ? get(bookingDate, "startDate") &&
                      get(bookingDate, "endDate") &&
                      renderControls
                    : null
                }
                onOutsideClick={() =>
                  !isMobileView() && setShowDatePicker(false)
                }
                orientation={
                  isMobileView() ? "verticalScrollable" : "horizontal"
                }
                enableOutsideDays={false}
                isOutsideRange={(day) => day.isBefore(initialMonth, "day")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DatePicker;
