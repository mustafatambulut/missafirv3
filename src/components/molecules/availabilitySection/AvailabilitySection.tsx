/*eslint-disable*/
"use client";
import { get, includes, map } from "lodash";
import { isMobile } from "react-device-detect";
import { useTranslations } from "next-intl";

import {
  setResPayload,
  setBookingDate
} from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IAvailabilitySection } from "@/components/molecules/availabilitySection/types";

import DatePicker from "@/components/atoms/datePicker/DatePicker";

import "./AvailabilitySection.css";
import Typography from "@/components/atoms/typography/Typography";

const AvailabilitySection = ({
  className = "",
  resData
}: IAvailabilitySection) => {
  const dispatch = useAppDispatch();
  const { bookingDate, resPayload } = useAppSelector(
    (state) => state.listingDetailReducer
  );

  const handleChangeDate = (date) => {
    dispatch(setBookingDate(date));
    dispatch(
      setResPayload({
        ...resPayload,
        check_in: get(date, "startDate")?.format("YYYY-MM-DD") || null,
        check_out: get(date, "endDate")?.format("YYYY-MM-DD") || null
      })
    );
  };
  const t = useTranslations();

  const unavailableDates = map(get(resData, "item.unavailable_dates"), "date");

  const handleUnavailableDates = (day) => {
    return includes(unavailableDates, day.format("DD.MM.YYYY"));
  };

  return (
    <section className={`flex flex-col gap-y-9 ${className}`}>
      <header>
        <Typography variant="h5" element="h5" className="text-gray-800">
          {t("availability")}
        </Typography>
      </header>
      <article>
        {/*todo: geri alınacak*/}
        {/*<DatePicker*/}
        {/*  showMinimumDateSelector={true}*/}
        {/*  isOutsideRange={handleUnavailableDates}*/}
        {/*  minimumNights={get(resData, "item.min_nights")}*/}
        {/*  isOpened={true}*/}
        {/*  date={bookingDate}*/}
        {/*  isShowLabel={false}*/}
        {/*  isShowDates={false}*/}
        {/*  noNavButtons={false}*/}
        {/*  isBordered={!isMobile}*/}
        {/*  bookingDate={bookingDate}*/}
        {/*  setDate={handleChangeDate}*/}
        {/*  daySize={isMobile ? 45 : 57}*/}
        {/*  setBookingDate={setBookingDate}*/}
        {/*  setSkipButtonVisibility={false}*/}
        {/*  numberOfMonths={isMobile ? 1 : 2}*/}
        {/*/>*/}
      </article>
    </section>
  );
};

export default AvailabilitySection;
