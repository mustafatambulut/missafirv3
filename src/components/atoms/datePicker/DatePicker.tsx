"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import classNames from "classnames";
import { get, isNull } from "lodash";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { DayPickerRangeController } from "react-dates";

import { IBookingDate, IDatePicker } from "@/components/atoms/datePicker/types";

import Button from "@/components/atoms/button/Button";

import "./DatePicker.css";
import "react-dates/lib/css/_datepicker.css";
import CalendarIcon from "../../../../public/images/calendar.svg";
import ChevronLeft from "../../../../public/images/chevron_left.svg";
import ChevronRight from "../../../../public/images/chevron_right.svg";
import ChevronDown from "../../../../public/images/chevron_down.svg";

const DatePicker = forwardRef((props: IDatePicker, ref) => {
  const {
    date,
    setDate,
    daySize = 0,
    isOutsideRange,
    className = "",
    isOpened = false,
    isBordered = true,
    minimumNights = 0,
    isShowLabel = true,
    isShowDates = true,
    numberOfMonths = 2,
    noNavButtons = false,
    datePickerClass = "",
    showCalendarIcon = true,
    orientation = "horizontal",
    isInCustomSection = false,
    withDatePreview = false,
    customOpenHandler = null,
    customOpenStatement = null,
    montHeaderPosition = "center",
    showSelector = true
  } = props;
  const initialMonth = moment();

  const [focusedInput, setFocusedInput] = useState<any>("startDate");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState<boolean>(true);
  const t = useTranslations();

  // todo: minimum stay için, düzenlenecek
  // const [dayInfo, setDayInfo] = useState<any>("");

  const onDatesChange = ({ startDate, endDate }: IBookingDate) => {
    setDate({ startDate, endDate });
  };

  const onFocusChange = (focusedInput: any) => {
    setFocusedInput(focusedInput || "startDate");
  };

  const handleChangeMonth = (date: moment.Moment) => {
    setIsPrevButtonHidden(
      date.format("YYYY/MM/DD") === initialMonth.format("YYYY/MM/DD")
    );
  };

  const handleClearDate = () => {
    setDate({ startDate: null, endDate: null });
    setFocusedInput("startDate");
  };

  useImperativeHandle(ref, () => ({
    handleClearDate
  }));

  useEffect(() => {
    setShowDatePicker(isOpened);
  }, [isOpened]);

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

  const renderMonthElement = (param) => {
    const montHeaderClass = classNames("flex flex-col", {
      "items-start": montHeaderPosition === "start",
      "items-center": montHeaderPosition === "center",
      "items-end": montHeaderPosition === "end"
    });
    const dayNames = new Array(7).fill(null).map((data, index) => {
      return (
        <li key={index} className="">
          <small>{moment().weekday(index).format("dd")}</small>
        </li>
      );
    });
    return (
      <div className={montHeaderClass}>
        <div className="px-4 font-mi-sans-semi-bold">
          {param.month.format("MMMM")} {param.month.format("YYYY")}
        </div>
        <ul className="w-full flex justify-between px-4">{dayNames}</ul>
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
    !isMobile && !isOpened && !withDatePreview && setShowDatePicker(false);
  };

  const containerClass = classNames(
    `cursor-pointer w-full rounded-2xl relative lg:mb-0 ${className}`,
    {
      "py-1 lg:px-4 lg:h-14": !isOpened && !withDatePreview,
      "prev-hidden": isPrevButtonHidden,
      "bg-white": !showDatePicker
    }
  );

  const selectorClass = classNames("flex flex-row lg:items-center h-full", {
    "border p-4 cursor-pointer w-full rounded-lg relative": withDatePreview,
    "h-10": isInCustomSection,
    "h-14": !isInCustomSection,
    "rounded-2xl": !withDatePreview,
    "justify-between w-full": withDatePreview
  });

  const datePickerClassName = classNames(`booking-date ${datePickerClass}`, {
    "lg:absolute lg:top-20 lg:left-0 lg:z-20 w-full h-full":
      !isOpened && !withDatePreview,
    "mt-3": withDatePreview && showDatePicker
  });

  const calendarClassName = classNames("hidden fill-gray-800", {
    "lg:block": !isOpened
  });

  const renderControls = () => {
    return (
      <>
        {/*<section className="w-full flex justify-between items-center p-2 bg-white text-gray-600 rounded-xl min-h-[30px]">*/}
        {/*  <div>*/}
        {/*todo: minimum stay için, düzenlenecek*/}
        {/*{dayInfo && (*/}
        {/*  <div className="text-black flex items-center text-sm">*/}
        {/*    <RoundedInfo className="mr-2" /> Minimum stay for check-in on{" "}*/}
        {/*    {dayInfo} is 2 nights.*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*  </div>*/}
        {/*</section>*/}
        {(get(date, "startDate") || get(date, "endDate")) && (
          <section className="w-full flex justify-between items-center p-2 bg-white text-gray-600 rounded-xl min-h-[30px]">
            <div className="flex ml-auto">
              <Button
                onClick={handleClearDate}
                variant="btn-ghost"
                className="text-primary bg-transparent shadow-none border-none">
                {t("clear")}
              </Button>
            </div>
          </section>
        )}
      </>
    );
  };

  const handleClickLabel = () => {
    customOpenHandler && customOpenHandler();
    withDatePreview ? setShowDatePicker((v) => !v) : setShowDatePicker(true);
  };

  useEffect(() => {
    customOpenStatement && customOpenStatement !== "date"
      ? setShowDatePicker(false)
      : null;
  }, [customOpenStatement]);

  return (
    <div className={containerClass}>
      {showSelector ? (
        <div className={selectorClass} onClick={handleClickLabel}>
          {showCalendarIcon && <CalendarIcon className={calendarClassName} />}
          <div
            className={`lg:flex lg:flex-col ${
              isInCustomSection && "w-[6.6rem]"
            } ${
              showCalendarIcon && !withDatePreview ? "lg:ml-3" : null
            } h-full lg:justify-center`}>
            {isShowLabel && (
              <>
                {isInCustomSection ? (
                  isNull(get(date, "startDate")) &&
                  isNull(get(date, "endDate")) && (
                    <span
                      className={`text-gray-600 text-left hidden lg:block ${
                        isInCustomSection ? "lg:text-base" : "lg:text-21"
                      }`}>
                      {t("any_week")}
                    </span>
                  )
                ) : (
                  <span
                    className={`text-gray-600 text-left hidden lg:block ${
                      get(date, "startDate") || get(date, "endDate")
                        ? "lg:text-sm"
                        : "lg:text-21"
                    }`}>
                    {t("dates")}
                  </span>
                )}
              </>
            )}
            {isShowDates && (
              <>
                {get(date, "startDate") || get(date, "endDate") ? (
                  <div
                    className={`flex ${
                      withDatePreview ? "text-gray-600" : "text-gray-800"
                    }`}>
                    <span className="whitespace-nowrap">
                      {get(date, "startDate")?.format("DD MMM")}
                    </span>
                    <span className="mx-1">-</span>
                    <span className="whitespace-nowrap">
                      {get(date, "endDate")?.format("DD MMM")}
                    </span>
                  </div>
                ) : (
                  <>
                    {withDatePreview ? (
                      <span className="text-gray-600">{t("select_dates")}</span>
                    ) : (
                      <span className="text-gray-600 block lg:hidden">
                        {t("choose_date")}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {withDatePreview && (
            <ChevronDown
              className={`fill-gray-600 scale-125 ${
                showDatePicker && "rotate-180"
              }`}
            />
          )}
        </div>
      ) : null}
      {showDatePicker && (
        <div className={datePickerClassName}>
          <DayPickerRangeController
            renderWeekHeaderElement={() => null}
            renderMonthElement={(param) => renderMonthElement(param)}
            isOutsideRange={isOutsideRange}
            minimumNights={minimumNights}
            noBorder={!isBordered}
            daySize={daySize}
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
            startDate={get(date, "startDate")}
            endDate={get(date, "endDate")}
            renderCalendarInfo={renderControls}
            onOutsideClick={handleOnOutsideClick}
            isDayBlocked={(day) => {
              return moment(day).isBefore(moment(), "day");
            }}
          />
        </div>
      )}
    </div>
  );
});
export default DatePicker;
