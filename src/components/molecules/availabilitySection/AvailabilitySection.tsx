"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import { get } from "lodash";
import { isMobile } from "react-device-detect";

import { useAppDispatch } from "@/redux/hooks";
import { IAvailabilitySection } from "@/components/molecules/availabilitySection/types";
import { updateBookingDate } from "@/redux/features/listingDetailSlice/listingDetailSlice";

import DatePicker from "@/components/atoms/datePicker/DatePicker";

import "./AvailabilitySection.css";

const AvailabilitySection = ({ className = "" }: IAvailabilitySection) => {
  const dispatch = useAppDispatch();
  const [bookingDate, setBookingDate] = useState({
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    dispatch(
      updateBookingDate({
        startDate: moment(get(bookingDate, "startDate")).toISOString(),
        endDate: moment(get(bookingDate, "endDate")).toISOString()
      })
    );
  }, [bookingDate]);

  return (
    <section className={`flex flex-col gap-y-9 ${className}`}>
      <header>
        <h1 className="text-2xl">Availability</h1>
      </header>
      <article>
        {/*todo: datepicker sorunu çözülecek*/}
        {/*<DatePicker*/}
        {/*  noNavButtons={false}*/}
        {/*  isOpenedStyle={true}*/}
        {/*  bookingDate={bookingDate}*/}
        {/*  numberOfMonths={isMobile ? 1 : 2}*/}
        {/*  setBookingDate={setBookingDate}*/}
        {/*  setSkipButtonVisibility={false}*/}
        {/*/>*/}
      </article>
    </section>
  );
};

export default AvailabilitySection;
