import { get, has } from "lodash";
import classNames from "classnames";

import { IReservationInfo } from "@/components/molecules/reservationInfo/types";

import Button from "@/components/atoms/button/Button";
import ReservationDate from "@/components/atoms/reservationDate/ReservationDate";
import ReservationEssentials from "@/components/atoms/reservationEssentials/ReservationEssentials";
import ExtraPayments from "@/components/molecules/extraPayments/ExtraPayments";
import PaymentDetails from "@/components/molecules/paymentDetails/PaymentDetails";
import ReservationComments from "@/components/molecules/reservationComments/reservationComments";

import UserIcon from "../../../../public/images/user_dark.svg";
import LetterIcon from "../../../../public/images/letter.svg";

const ReservationInfo = ({ reservation }: IReservationInfo) => {
  const statusClassName = classNames(
    "rounded text-white text-sm lg:text-xl font-mi-sans-semi-bold flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3",
    {
      "bg-success-green": get(reservation, "status.type") === "confirmed",
      "bg-warning-yellow": get(reservation, "status.type") === "pending",
      "bg-error-red": get(reservation, "status.type") === "cancelled"
    }
  );
  return (
    <>
      <div className="flex justify-start items-center">
        <div className={statusClassName}>
          {get(reservation, "status.label")}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <div className="text-lg lg:text-28 font-mi-sans-semi-bold text-gray-800">
            {get(reservation, "title")}
          </div>
          <div className="text-gray-500 text-base lg:text-xl">
            {get(reservation, "location")}
          </div>
        </div>
        <div className="rounded-lg cursor-pointer border-2 px-2 lg:px-4 py-1 text-primary-500 border-primary-500 text-sm lg:text-lg font-mi-sans-semi-bold flex justify-center items-center gap-3">
          <LetterIcon /> <span>Inbox</span>
        </div>
      </div>
      <ReservationEssentials reservation={reservation} />
      <div className="text-base lg:text-21 text-gray-500">
        {get(reservation, "address")}
      </div>
      <div className="flex justify-start">
        <Button
          variant="btn-ghost"
          className="text-lg text-primary font-mi-sans-semi-bold pl-0">
          Get Direction
        </Button>
      </div>
      <div className="flex gap-3">
        <ReservationDate
          reservationDate={get(reservation, "dates.checkIn")}
          label="Check-in"
        />
        <ReservationDate
          reservationDate={get(reservation, "dates.checkOut")}
          label="Check-out"
        />
        <div className="rounded-lg bg-gray-50 w-auto lg:w-1/2 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <UserIcon className="fill-gray-800 scale-125 lg:scale-150" />
          </div>
          <div className="flex text-gray-700 text-base lg:text-xl gap-x-3">
            <div>{get(reservation, "guests")}</div>
            <span className="hidden lg:block">Guests</span>
          </div>
        </div>
      </div>
      {has(reservation, "extraPayments") && (
        <ExtraPayments reservation={reservation} />
      )}
      <PaymentDetails reservation={reservation} />
      <ReservationComments />
    </>
  );
};

export default ReservationInfo;
