import { get } from "lodash";
import classNames from "classnames";

import { IReservationItem } from "@/components/molecules/reservationItem/types";

import GuestsIcon from "../../../../public/images/guests.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";

const ReservationItemContent = ({ reservation }: IReservationItem) => {
  const statusSectionClass = classNames({
    "bg-warning-yellow": get(reservation, "status.type") === "pending",
    "bg-success-green": get(reservation, "status.type") === "confirmed",
    "bg-error-red": get(reservation, "status.type") === "cancelled"
  });
  return (
    <div className="flex flex-col gap-1 lg:gap-y-3 justify-center lg:pr-4 py-3 lg:py-0">
      <div className="text-gray-700 text-sm lg:text-lg order-1">
        {get(reservation, "code")}
      </div>
      <div className="text-gray-800 text-base lg:text-2xl font-mi-sans-semi-bold line-clamp-2 order-3 lg:order-2">
        {get(reservation, "title")}
      </div>
      <div className="text-gray-500 text-sm lg:text-lg order-2 lg:order-3">
        {get(reservation, "location")}
      </div>
      <div className="flex flex-col lg:flex-row text-gray-600 text-sm lg:text-22 lg:gap-y-0 gap-x-5 items-start lg:items-center order-4">
        <div className="flex gap-x-1 lg:gap-x-2 items-center">
          <CalendarIcon className="fill-gray-600 scale-75" />
          <span>{get(reservation, "dates.checkIn.date.month")}</span>
          <span>-</span>
          <span>{get(reservation, "dates.checkOut.date.month")}</span>
        </div>
        <div className="flex items-center gp-x-1 lg:gap-x-2">
          <GuestsIcon className="fill-gray-600 scale-75" />
          <span>{get(reservation, "guests")} Guests</span>
        </div>
      </div>
      <div className="flex justify-between order-5">
        <div className="listing-item-content-price flex items-end">
          <span className="text-primary text-lg lg:text-28 font-mi-sans-semi-bold">
            {get(reservation, "price.amount")}
          </span>
          <span className="text-xs lg:text-sm text-gray-500 ml-2">
            / {get(reservation, "price.type")}
          </span>
        </div>
        <div
          className={`${statusSectionClass} rounded text-white text-xl font-mi-sans-semi-bold hidden lg:flex items-center justify-center px-1 lg:py-2 lg:px-3`}>
          {get(reservation, "status.label")}
        </div>
      </div>
    </div>
  );
};

export default ReservationItemContent;
