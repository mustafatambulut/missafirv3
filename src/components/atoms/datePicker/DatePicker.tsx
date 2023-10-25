"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import moment from "moment";
import get from "lodash/get";
import "react-dates/initialize";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { useLocale, useTranslations } from "next-intl";
import { DayPickerRangeController } from "react-dates";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingDate, IDatePicker } from "@/components/atoms/datePicker/types";
import { setMinUnavailableDate } from "@/redux/features/reservationSlice/reservationSlice";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import InputDatePicker from "@/components/molecules/inputDatePicker/InputDatePicker";
import MonthDatePicker from "@/components/molecules/monthDatePicker/MonthDatePicker";
import DatePickerSkeleton from "@/components/molecules/datePickerSkeleton/DatePickerSkeleton";

import "./DatePicker.css";
import "react-dates/lib/css/_datepicker.css";
import ChevronLeft from "../../../../public/images/chevron_left.svg";
import QuestionMark from "../../../../public/images/questionmark.svg";
import ChevronRight from "../../../../public/images/chevron_right.svg";

// eslint-disable-next-line react/display-name
const DatePicker = forwardRef((props: IDatePicker, ref) => {
  const {
    date,
    setDate,
    daySize = 0,
    isOutsideRange,
    placeholder = "",
    className = "",
    isOpened = false,
    isShimmer = false,
    isBordered = true,
    minimumNights = 1,
    numberOfMonths = 2,
    isShowLabel = true,
    isShowDates = true,
    showSelector = true,
    noNavButtons = false,
    datePickerClass = "",
    showCalendarIcon = true,
    withDatePreview = false,
    customOpenHandler = null,
    isInCustomSection = false,
    showDateFormat = "DD MMM",
    initialVisibleMonth = null,
    orientation = "horizontal",
    customOpenStatement = null,
    montHeaderPosition = "center",
    showMinimumDateSelector = false
  } = props;
  const locale = useLocale();
  const t = useTranslations();
  const initialMonth = moment();
  const dispatch = useAppDispatch();
  const [dayInfo, setDayInfo] = useState<any>("");
  const [focusedInput, setFocusedInput] = useState<any>("startDate");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState<boolean>(true);

  const isLoadingDatePicker = useAppSelector(
    (state) => state.listingDetailReducer.isLoadingDatePicker
  );

  const containerClass = classNames(
    `cursor-pointer w-full rounded-2xl relative lg:mb-0 ${className}`,
    {
      "py-1 lg:px-4 lg:h-14": !isOpened && !withDatePreview,
      "prev-hidden": isPrevButtonHidden,
      "bg-white": !showDatePicker
    }
  );

  const datePickerClassName = classNames(`booking-date ${datePickerClass}`, {
    "lg:absolute lg:top-20 lg:left-0 lg:z-20 w-full h-full":
      !isOpened && !withDatePreview,
    "mt-3": withDatePreview && showDatePicker
  });

  const onDatesChange = ({ startDate, endDate }: IBookingDate) => {
    setDate({ startDate, endDate });
  };

  const onFocusChange = (focusedInput: any) => {
    setFocusedInput(focusedInput || "startDate");
  };

  const handleIsDayBlocked = (day) => moment(day).isBefore(moment(), "day");

  const handleChangeMonth = (date: moment.Moment) => {
    setIsPrevButtonHidden(
      date.format("YYYY/MM/DD") === initialMonth.format("YYYY/MM/DD")
    );
  };

  const handleClearDate = () => {
    setDate({ startDate: null, endDate: null });
    dispatch(setMinUnavailableDate(null));
    setFocusedInput("startDate");
  };

  useImperativeHandle(ref, () => ({
    handleClearDate
  }));

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

  const renderControls = () => {
    return (
      <div className="flex items-center px-4 justify-between pb-4 min-h-[3rem]">
        {showMinimumDateSelector ? (
          <section className="flex items-center">
            {dayInfo && (
              <div className="flex items-center gap-x-2 max-w-[80%] lg:max-w-full">
                <div>
                  <QuestionMark className="fill-primary" />
                </div>
                <Typography
                  variant="h5.1"
                  element="p"
                  className="font-mi-sans`">
                  {t("minimum_stay", {
                    infoDate: dayInfo,
                    infoNights: minimumNights
                  })}
                </Typography>
              </div>
            )}
          </section>
        ) : null}
        {(get(date, "startDate") || get(date, "endDate")) && (
          <section>
            <div className="flex ml-auto">
              <Button
                onClick={handleClearDate}
                variant="btn-ghost"
                className={`text-primary bg-transparent shadow-none border-none`}>
                {t("clear")}
              </Button>
            </div>
          </section>
        )}
      </div>
    );
  };

  const renderDayContents = (day) => {
    const isToday = moment(day).isSame(moment(), "day");
    return (
      <div
        className="day-content"
        onMouseEnter={() => {
          if (focusedInput === "startDate") {
            setDayInfo(
              locale === "tr" ? day.format("D MMMM") : day.format("MMMM D")
            );
          }
        }}
        onMouseLeave={() => {
          setDayInfo("");
        }}>
        <div>{day.format("D")}</div>
        {isToday && (
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] text-4xl leading-8 text-primary day-dot">
            .
          </div>
        )}
      </div>
    );
  };

  const renderMonthElement = (param) => (
    <MonthDatePicker param={param} montHeaderPosition={montHeaderPosition} />
  );

  const handleInitialMonths = (): void => {
    !!initialVisibleMonth && typeof initialVisibleMonth === "function"
      ? initialVisibleMonth()
      : initialMonth;
  };

  useEffect(() => {
    customOpenStatement && customOpenStatement !== "date"
      ? setShowDatePicker(false)
      : null;
  }, [customOpenStatement]);

  useEffect(() => {
    setShowDatePicker(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (get(date, "endDate")) {
      setShowDatePicker(false);
    }
  }, [get(date, "endDate")]);

  return (
    <div className={containerClass}>
      {showSelector && (
        <InputDatePicker
          showSelector={showSelector}
          placeholder={placeholder}
          isShowLabel={isShowLabel}
          isShowDates={isShowDates}
          withDatePreview={withDatePreview}
          showDateFormat={showDateFormat}
          showDatePicker={showDatePicker}
          showCalendarIcon={showCalendarIcon}
          isInCustomSection={isInCustomSection}
          customOpenHandler={customOpenHandler}
          setShowDatePicker={setShowDatePicker}
          {...props}
        />
      )}
      {showDatePicker && (
        <>
          {isShimmer ? (
            <Loading
              isLoading={isLoadingDatePicker}
              loader={<DatePickerSkeleton />}>
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
                  initialVisibleMonth={handleInitialMonths()}
                  startDate={get(date, "startDate")}
                  endDate={get(date, "endDate")}
                  renderCalendarInfo={renderControls}
                  onOutsideClick={handleOnOutsideClick}
                  isDayBlocked={handleIsDayBlocked}
                />
              </div>
            </Loading>
          ) : (
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
                initialVisibleMonth={handleInitialMonths()}
                startDate={get(date, "startDate")}
                endDate={get(date, "endDate")}
                renderCalendarInfo={renderControls}
                onOutsideClick={handleOnOutsideClick}
                isDayBlocked={handleIsDayBlocked}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
});
export default DatePicker;
