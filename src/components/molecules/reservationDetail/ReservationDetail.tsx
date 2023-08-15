"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppSelector } from "@/redux/hooks";

import { IReservationItemProps } from "@/components/molecules/reservationItem/types";
import { IReservationDetail } from "@/components/molecules/reservationDetail/types";

import Slider from "@/components/molecules/slider/Slider";
import ReservationInfo from "@/components/molecules/reservationInfo/ReservationInfo";

const ReservationDetail = ({ reservationId }: IReservationDetail) => {
  const { reservations } = useAppSelector((state) => state.profileReducer);
  const [reservation, setReservation] = useState<IReservationItemProps>();
  useEffect(() => {
    const reservation = reservations.find(
      (reservation) => reservation.id === reservationId
    );
    setReservation(reservation);
  }, [reservationId, reservations]);

  return (
    <>
      <Slider
        sliderIdentifier="reservation-detail"
        slidesPerView={isMobile ? 1 : 2}
        withPagination={isMobile}
        spaceBetween={10}>
        {map(get(reservation, "images"), (image, key) => {
          return (
            <div className="w-full h-60" key={key}>
              <Image
                src={get(image, "src")}
                alt="home"
                key={key}
                fill={true}
                className="object-cover rounded-xl"
              />
            </div>
          );
        })}
      </Slider>

      <ReservationInfo reservation={reservation} />
    </>
  );
};

export default ReservationDetail;
