"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { get, isEmpty } from "lodash";
import { isMobile } from "react-device-detect";

import { getScrollPosition } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IReservationSummary } from "@/components/atoms/reservationSummary/types";
import { setReservation } from "@/redux/features/reservationSlice/reservationSlice";

import Loading from "@/components/atoms/loading/Loading";
import ReservationBody from "@/components/molecules/reservationBody/ReservationBody";
import ReservationSummarySkeleton from "@/components/molecules/skeletons/reservationSummarySkeleton/ReservationSummarySkeleton";

const ReservationSummary = ({
  resData,
  className = "",
  hideCouponCode = true,
  isHiddenable = false
}: IReservationSummary) => {
  const dispatch = useAppDispatch();
  const { reservation } = useAppSelector((state) => state.reservationReducer);
  const [isScrollActive, setIsScrollActive] = useState<boolean>(false);

  const containerClass = classNames(
    `w-screen lg:w-full h-fit bg-white px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 left-0 z-30 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {
      block: !isScrollActive,
      hidden: isHiddenable && isScrollActive
    }
  );

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 300 : 0;
    setIsScrollActive(scrollPosition > requiredScrollPosition);
  };

  useEffect(() => {
    if (isMobile && typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!reservation && !isEmpty(get(resData, "item.reservation"))) {
      dispatch(setReservation(get(resData, "item.reservation")));
    }
  }, [get(resData, "item.reservation"), reservation]);

  return (
    <div className={containerClass}>
      <Loading isLoading={!reservation} loader={<ReservationSummarySkeleton />}>
        <div className="flex flex-col gap-y-4">
          <ReservationBody hideCouponCode={hideCouponCode} />
        </div>
      </Loading>
    </div>
  );
};

export default ReservationSummary;
