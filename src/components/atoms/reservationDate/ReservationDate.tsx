import CalendarIcon from "../../../../public/images/calendar.svg";
import { IReservationDate } from "@/components/atoms/reservationDate/types";
import Typography from "../typography/Typography";

const ReservationDate = ({
  reservationDate,
  reservationTime,
  label
}: IReservationDate) => {
  return (
    <div className="rounded-lg bg-gray-50 lg:flex-1 flex justify-start items-center gap-2 py-2 lg:py-3 px-3 lg:px-5 mt-5">
      <div>
        <CalendarIcon className="fill-gray-800 lg:scale-125" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-base lg:text-xl  text-gray-700 font-mi-sans-semi-bold">
          {label}
        </div>
        <div className="text-sm lg:text-xl text-gray-500 flex flex-col lg:flex-row gap-x-3">
          <div className="flex gap-x-1">
            <Typography variant="p2" element="span">{reservationDate}</Typography>
          </div>
          <Typography variant="p2" element="span">{reservationTime}</Typography>
        </div>
      </div>
    </div>
  );
};

export default ReservationDate;
