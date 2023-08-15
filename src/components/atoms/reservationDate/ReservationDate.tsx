import CalendarIcon from "../../../../public/images/calendar.svg";
import { get } from "lodash";
import { IReservationDate } from "@/components/atoms/reservationDate/types";

const ReservationDate = ({ reservationDate, label }: IReservationDate) => {
  return (
    <div className="rounded-lg bg-gray-50 w-auto lg:w-1/2 flex justify-start items-center gap-2 py-2 lg:py-3 px-3 lg:px-5">
      <div>
        <CalendarIcon className="fill-gray-800 lg:scale-125" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-base lg:text-xl  text-gray-700 font-mi-sans-semi-bold">
          {label}
        </div>
        <div className="text-sm lg:text-xl text-gray-500 flex flex-col lg:flex-row gap-x-3">
          <span>{get(reservationDate, "date")}</span>
          <span>{get(reservationDate, "time")}</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationDate;
