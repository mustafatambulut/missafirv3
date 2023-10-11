import { capitalize, get } from "lodash";

import { IReservationItem } from "@/components/molecules/reservationItem/types";

import GuestsIcon from "../../../../public/images/guests.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const ReservationItemContent = ({ reservation }: IReservationItem) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-1 lg:gap-y-3 justify-center lg:pr-4 py-3 lg:py-0 w-full">
      <Typography variant="p3" element="div" className="text-gray-700 order-1 lg:order-1">
        {get(reservation, "confirmation_code")}
      </Typography>
      <div className="text-gray-800 text-base lg:text-2xl font-mi-sans-semi-bold line-clamp-2 order-3 lg:order-2">
        {get(reservation, "listing.title")}
      </div>
      <div className="flex gap-x-1 order-2 lg:order-3">
        <Typography variant="p3" element="div" className="text-gray-500 ">
          {get(reservation, "listing.city.name")},
        </Typography>
        <Typography variant="p3" element="div" className="text-gray-500 ">
          {get(reservation, "listing.district.name")}
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row text-gray-600 text-sm lg:text-22 lg:gap-y-0 gap-x-5 items-start lg:items-center order-4">
        <div className="flex gap-x-1 lg:gap-x-2 items-center">
          <CalendarIcon className="fill-gray-600 scale-75" />
          <Typography variant="p2" element="span">{get(reservation, "check_in")}</Typography>
          <Typography variant="p2" element="span">-</Typography>
          <Typography variant="p2" element="span">{get(reservation, "check_out")}</Typography>
        </div>
        <div className="flex items-center gp-x-1 lg:gap-x-2">
          <GuestsIcon className="fill-gray-600 scale-75" />
          <Typography variant="p2" element="span">{get(reservation, "guests")} {t("guests")}</Typography>
        </div>
      </div>
      <div className="flex justify-between order-5">
        <div className="listing-item-content-price flex items-end">
          <Typography variant="p2" element="span" className="text-primary font-mi-sans-semi-bold">
            {get(reservation, "price.final")}
          </Typography>
          <Typography variant="p2" element="span" className="text-gray-500 ml-2">
            / {get(reservation, "total_nights")} <Typography variant="p2" element="span"> {t("nights")} </Typography>
          </Typography>
        </div>
        <div
          className="rounded text-white text-xl font-mi-sans-semi-bold hidden lg:flex items-center justify-center px-1 lg:py-2 lg:px-3"
          style={{ backgroundColor: get(reservation, "status.hex") }}>
          {capitalize(get(reservation, "status.title"))}
        </div>
      </div>
    </div>
  );
};

export default ReservationItemContent;
