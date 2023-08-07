import { get } from "lodash";
import classNames from "classnames";

import { IReservationItem } from "@/components/molecules/reservationItem/types";

const ReservationItemContent = ({ reservation }: IReservationItem) => {
  const statusSectionClass = classNames({
    "bg-warning-yellow": get(reservation, "status.type") === "pending",
    "bg-success-green": get(reservation, "status.type") === "confirmed",
    "bg-error-red": get(reservation, "status.type") === "cancelled"
  });
  return (
    <div className="flex flex-col gap-1 lg:gap-y-3 justify-center lg:pr-4">
      <div className="text-gray-700 text-sm lg:text-lg">
        {get(reservation, "code")}
      </div>
      <div className="text-gray-800 text-base lg:text-2xl font-mi-sans-semi-bold line-clamp-2">
        {get(reservation, "title")}
      </div>
      <div className="text-gray-500 text-sm lg:text-lg">
        {get(reservation, "location")}
      </div>
      <div className="flex text-gray-600 text-sm lg:text-22 gap-x-4 items-center">
        <div>{get(reservation, "dates")}</div>
        <div>{get(reservation, "guests")}</div>
      </div>
      <div className="flex justify-between">
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
