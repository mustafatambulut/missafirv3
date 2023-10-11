"use client";
import { get } from "lodash";
import moment from "moment";
import { useTranslations } from "next-intl";

import { useAppSelector } from "@/redux/hooks";
import { IReservationHeader } from "@/components/atoms/reservationHeader/types";

import DateSummary from "@/components/atoms/dateSummary/DateSummary";
import Typography from "../typography/Typography";

const ReservationHeader = ({ isDateSummary }: IReservationHeader) => {
  const t = useTranslations();
  const { detail, reservation } = useAppSelector(
    (state) => state.reservationReducer
  );
  const { resPayload } = useAppSelector((state) => state.listingDetailReducer);

  const formatDate = (date) => (date ? moment(date).format("DD MMM") : "-");
  return (
    <div className="flex flex-col gap-y-4">
      <Typography variant="h4" element="h4" className="font-mi-sans font-normal text-gray-800 hidden lg:block">
        {get(reservation, "price.average_daily_price") ||
          get(detail, "item.reservation.price")}
        <Typography variant="h5.1" element="span" className="text-sm text-gray-500">{` /${t("nightly")}`}</Typography>
      </Typography>
      {isDateSummary && (
        <DateSummary
          startDate={formatDate(get(resPayload, "check_in"))}
          endDate={formatDate(get(resPayload, "check_out"))}
          bookingGuests={get(resPayload, "adults")}
        />
      )}
    </div>
  );
};

export default ReservationHeader;
