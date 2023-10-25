"use client";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/redux/hooks";
import { setIsSelectedBookingDate } from "@/redux/features/listingDetailSlice/listingDetailSlice";

import Typography from "../typography/Typography";
import { IDateSummary } from "@/components/atoms/dateSummary/types";

import PencilIcon from "../../../../public/images/pencil.svg";

const DateSummary = ({
  endDate,
  startDate,
  bookingGuests,
  className = ""
}: IDateSummary) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setIsSelectedBookingDate(false));
  };

  return (
    <div
      onClick={handleOnClick}
      className={`flex items-center justify-between text-lg text-gray-600 rounded-lg py-2 px-3 border border-gray-200 cursor-pointer ${className}`}>
      <div className="flex items-center gap-x-2">
        <Typography variant="p3" element="span">
          {startDate}
        </Typography>
        <span>-</span>
        <Typography variant="p3" element="span">
          {endDate}
        </Typography>
        <Typography variant="p3" element="span">
          {`& ${bookingGuests} ${t("guest")}`}{" "}
        </Typography>
      </div>
      <div className="flex justify-end">
        <PencilIcon />
      </div>
    </div>
  );
};

export default DateSummary;
