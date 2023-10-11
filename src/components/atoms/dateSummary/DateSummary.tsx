"use client";
import { useAppDispatch } from "@/redux/hooks";
import { IDateSummary } from "@/components/atoms/dateSummary/types";
import { setIsBookingInfoEditing } from "@/redux/features/listingDetailSlice/listingDetailSlice";

import PencilIcon from "../../../../public/images/pencil.svg";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const DateSummary = ({
  endDate,
  startDate,
  bookingGuests,
  className = ""
}: IDateSummary) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const handleBookingInfo = () => dispatch(setIsBookingInfoEditing(true));

  return (
    <div
      onClick={handleBookingInfo}
      className={`flex items-center justify-between text-lg text-gray-600 rounded-lg py-2 px-3 border border-gray-200 cursor-pointer ${className}`}>
      <div className="flex items-center gap-x-2">
        {startDate}
        <span>-</span>
        {endDate}
        <Typography variant="p3" element="span">{`& ${bookingGuests} ${t("guest")}`} </Typography>
      </div>
      <div className="flex justify-end">
        <PencilIcon />
      </div>
    </div>
  );
};

export default DateSummary;
