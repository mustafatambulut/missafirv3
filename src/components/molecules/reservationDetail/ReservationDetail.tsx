"use client";
import { useEffect } from "react";
import Image from "next/image";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  fetchRecentReservationDetails,
  updateReservation
} from "@/redux/features/profileSlice";
import { IReservationDetail } from "@/components/molecules/reservationDetail/types";

import Loading from "@/components/atoms/loading/Loading";
import Slider from "@/components/molecules/slider/Slider";
import ReservationInfo from "@/components/molecules/reservationInfo/ReservationInfo";
import ReservationDetailSkeleton from "@/components/molecules/skeletons/reservationDetailSkeleton/ReservationDetailSkeleton";

const ReservationDetail = ({ reservationId }: IReservationDetail) => {
  const dispatch = useAppDispatch();
  const { reservation, loading } = useAppSelector(
    (state) => state.profileReducer
  );

  useEffect(() => {
    dispatch(fetchRecentReservationDetails(reservationId));
  }, [reservationId]);

  useEffect(() => {
    return () => {
      dispatch(updateReservation(null));
    };
  }, []);

  return (
    <Loading isLoading={loading} loader={<ReservationDetailSkeleton />}>
      <>
        <Slider
          sliderIdentifier="reservation-detail"
          slidesPerView={isMobile ? 1 : 2}
          withPagination={isMobile}
          spaceBetween={10}>
          {map(get(reservation, "listing.pictures"), (image, key) => {
            return (
              <div className="w-full h-60" key={key}>
                <Image
                  src={get(image, "path") || "/"}
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
    </Loading>
  );
};

export default ReservationDetail;
