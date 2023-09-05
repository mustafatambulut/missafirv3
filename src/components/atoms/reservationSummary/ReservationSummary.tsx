"use client";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { getScrollPosition } from "@/utils/helper";
import { IReservationSummary } from "@/components/atoms/reservationSummary/types";
import { setReservation } from "@/redux/features/reservationSlice/reservationSlice";

import ReservationBody from "@/components/molecules/reservationBody/ReservationBody";
import ReservationHeader from "@/components/atoms/reservationHeader/ReservationHeader";
import ReservationFooter from "@/components/molecules/reservationFooter/ReservationFooter";

const ReservationSummary = ({
  reservation,
  isDateSummary,
  className = "",
  hideCouponCode = false
}: IReservationSummary) => {
  const dispatch = useDispatch();
  const [isScrollActive, setIsScrollActive] = useState<boolean>(false);

  const containerClass = classNames(
    `w-full h-fit bg-white px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 z-50 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {
      block: !isScrollActive,
      hidden: isScrollActive
    }
  );

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 300 : 0;
    setIsScrollActive(scrollPosition > requiredScrollPosition);
  };

  useEffect(() => {
    if (!isMobile) return;

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    !isEmpty(reservation) && dispatch(setReservation(reservation));
  }, [reservation]);

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-6">
        <ReservationHeader isDateSummary={isDateSummary} />
        {!hideCouponCode && <ReservationBody hideCouponCode={hideCouponCode} />}
        <ReservationFooter />
      </div>
    </div>
  );
};

export default ReservationSummary;
