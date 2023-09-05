"use client";
import { get } from "lodash";
import moment from "moment";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { IReservationHeader } from "@/components/atoms/reservationHeader/types";

import DateSummary from "@/components/atoms/dateSummary/DateSummary";

const ReservationHeader = ({ isDateSummary }: IReservationHeader) => {
  const t = useTranslations();
  const { reservation } = useAppSelector((state) => state.reservationReducer);
  const { booking } = useAppSelector((state) => state.listingDetailReducer);

  const formatDate = (date) => (date ? moment(date).format("DD MMM") : "-");

  return (
    !isMobile && (
      <>
        <h2 className="text-2xl font-mi-sans font-normal text-gray-700">
          {get(reservation, "price.average_daily_price")}
          <span className="text-sm text-gray-400">{` /${t("nightly")}`}</span>
        </h2>
        {isDateSummary && (
          <DateSummary
            startDate={formatDate(get(booking, "startDate"))}
            endDate={formatDate(get(booking, "endDate"))}
          />
        )}
      </>
    )
  );
};

export default ReservationHeader;
