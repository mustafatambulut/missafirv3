import { get, map } from "lodash";
import { IReservationEssentials } from "@/components/atoms/reservationEssentials/types";

const ReservationEssentials = ({ reservation }: IReservationEssentials) => {
  return (
    <div className="flex gap-x-4 text:base lg:text-2xl text-gray-600 font-mi-sans-semi-bold">
      {map(get(reservation, "essentials"), (essential, key) => {
        return <div key={key}>{essential}</div>;
      })}
    </div>
  );
};

export default ReservationEssentials;
