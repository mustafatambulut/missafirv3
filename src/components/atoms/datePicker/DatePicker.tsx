"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { get } from "lodash";
import "react-dates/initialize";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { DayPickerRangeController } from "react-dates";

import { IBookingDate, IDatePicker } from "@/components/atoms/datePicker/types";

import "./DatePicker.css";
import "react-dates/lib/css/_datepicker.css";

import CalendarIcon from "../../../../public/images/calendar.svg";
import ChevronLeft from "../../../../public/images/chevron_left.svg";
import ChevronRight from "../../../../public/images/chevron_right.svg";
import Button from "@/components/atoms/button/Button";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setBookingDate } from "@/redux/features/datePickerSlice/datePickerSlice";

const DatePicker = ({
  className = "",
  datePickerClass = "",
  isOpenedStyle = false,
  noNavButtons = false,
  numberOfMonths = 2,
  isShowLabel = true,
  orientation = "horizontal"
}: IDatePicker) => {
  const dispatch = useDispatch();
  const initialMonth = moment();
  const { bookingDate } = useAppSelector((state) => state.datePickerReducer);

  const [focusedInput, setFocusedInput] = useState<any>("startDate");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState<boolean>(true);

  // todo: minimum stay için, düzenlenecek
  // const [dayInfo, setDayInfo] = useState<any>("");

  const onDatesChange = ({ startDate, endDate }: IBookingDate) => {
    dispatch(setBookingDate({ startDate, endDate }));
  };

  const onFocusChange = (focusedInput: any) => {
    setFocusedInput(focusedInput || "startDate");
  };

  const handleChangeMonth = (date: moment.Moment) => {
    setIsPrevButtonHidden(
      date.format("YYYY/MM/DD") === initialMonth.format("YYYY/MM/DD")
    );
  };

  useEffect(() => {
    isMobile && setShowDatePicker(true);
  }, []);

  useEffect(() => {
    isOpenedStyle && setShowDatePicker(isOpenedStyle);
  }, [isOpenedStyle]);

  const renderDayContents = (day) => {
    const isToday = moment(day).isSame(moment(), "day");
    return (
      <div className="day-content">
        <div>{day.format("D")}</div>
        {isToday && (
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] text-4xl leading-8 text-primary day-dot">
            .
          </div>
        )}
      </div>
    );
  };

  const navPrevIcon = () => (
    <div className="nav-button nav-button-prev">
      <ChevronLeft className="scale-50" />
    </div>
  );

  const navNextIcon = () => (
    <div className="nav-button nav-button-next">
      <ChevronRight className="scale-50" />
    </div>
  );

  const handleOnOutsideClick = () => {
    !isMobile && !isOpenedStyle && setShowDatePicker(false);
  };

  const containerClass = classNames(
    `cursor-pointer w-full rounded-2xl relative mb-20 lg:mb-0 ${className}`,
    {
      "py-1 lg:px-4 lg:h-[56px]": !isOpenedStyle,
      "prev-hidden": isPrevButtonHidden,
      "lg:bg-gray-50": showDatePicker && !isOpenedStyle,
      "bg-white": !showDatePicker
    }
  );

  const datePickerClassName = classNames(`booking-date ${datePickerClass}`, {
    "lg:absolute lg:top-20 lg:left-0 lg:z-20 w-full h-full": !isOpenedStyle
  });

  const calendarClassName = classNames("hidden fill-gray-800", {
    "lg:block": !isOpenedStyle
  });

  const renderControls = () => {
    return (
      <section className="w-full flex justify-between items-center p-2 bg-white text-gray-600 rounded-xl min-h-[30px]">
        <div>
          {/*todo: minimum stay için, düzenlenecek*/}
          {/*{dayInfo && (*/}
          {/*  <div className="text-black flex items-center text-sm">*/}
          {/*    <RoundedInfo className="mr-2" /> Minimum stay for check-in on{" "}*/}
          {/*    {dayInfo} is 2 nights.*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        {(get(bookingDate, "startDate") || get(bookingDate, "endDate")) && (
          <div className="flex">
            <Button
              onClick={() =>
                dispatch(
                  setBookingDate({
                    startDate: null,
                    endDate: null
                  })
                )
              }
              variant="btn-link"
              className="text-gray-600 bg-transparent shadow-none border-none">
              Clear
            </Button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className={containerClass}>
      <div
        className="lg:flex lg:items-center h-full"
        onClick={() => setShowDatePicker(true)}>
        <CalendarIcon className={calendarClassName} />
        <div className="lg:flex lg:flex-col lg:ml-3 h-full lg:justify-center">
          {!isOpenedStyle && isShowLabel && (
            <span className="text-gray-600 text-left hidden lg:block lg:text-21">
              Dates
            </span>
          )}
          {!isMobile && !isOpenedStyle && (
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
            <div className={datePickerClassName}>
              <DayPickerRangeController
                keepOpenOnDateSelect={true}
                navNext={navNextIcon()}
                navPrev={navPrevIcon()}
                transitionDuration={0}
                minDate={initialMonth}
                orientation={orientation}
                enableOutsideDays={false}
                hideKeyboardShortcutsPanel
                noNavButtons={noNavButtons}
                focusedInput={focusedInput}
                calendarInfoPosition="bottom"
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                showKeyboardShortcuts={false}
                numberOfMonths={numberOfMonths}
                onPrevMonthClick={handleChangeMonth}
                onNextMonthClick={handleChangeMonth}
                noNavPrevButton={isPrevButtonHidden}
                renderDayContents={renderDayContents}
                initialVisibleMonth={() => initialMonth}
                startDate={get(bookingDate, "startDate")}
                endDate={get(bookingDate, "endDate")}
                renderCalendarInfo={isMobile || renderControls}
                onOutsideClick={handleOnOutsideClick}
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
