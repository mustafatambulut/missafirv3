"use client";
import { ReactNode } from "react";
import { get } from "lodash";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IReservationCost } from "@/components/molecules/reservationCost/types";
import { changeIsShowCouponCode } from "@/redux/features/reservationSlice/reservationSlice";

import CouponCode from "@/components/atoms/couponCode/CouponCode";
import AlertCouponCode from "@/components/atoms/alertCouponCode/AlertCouponCode";

const ReservationCost = ({
  tempTotal,
  paymentDetail,
  className = "",
  setPaymentDetail,
  hideCouponCode,
  amountWithoutDiscount
}: IReservationCost) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { reservation, isApplyCouponCode, isShowCouponCode } = useAppSelector(
    (state) => state.reservationReducer
  );

  const costClass = classNames(`mt-2 ${className}`, {
    "border-dashed border-t-2 border-gray-200": isApplyCouponCode
  });

  const handleApplyCouponCode = (): void => {
    dispatch(changeIsShowCouponCode(!isShowCouponCode));
  };

  const ApplyCouponCodeComponent = (): ReactNode => {
    return (
      !isApplyCouponCode && (
        <button
          onClick={handleApplyCouponCode}
          className="link text-primary-600">
          {t("apply_coupon_code")}
        </button>
      )
    );
  };

  const CouponCodeComponent = (): ReactNode => {
    return (
      isShowCouponCode && (
        <div>
          <CouponCode />
        </div>
      )
    );
  };

  const AlertCouponCodeComponent = (): ReactNode => {
    return (
      isApplyCouponCode && (
        <AlertCouponCode
          tempTotal={tempTotal}
          paymentDetail={paymentDetail}
          setPaymentDetail={setPaymentDetail}
          isApplyCouponCode={isApplyCouponCode}
        />
      )
    );
  };

  return (
    <div className={costClass}>
      <CouponCodeComponent />
      <AlertCouponCodeComponent />
      <div className="mt-3 flex justify-between">
        <div className="flex text-lg gap-x-1">
          <span className="text-gray-800 font-mi-sans">
            {t("you_will_pay")}
          </span>
          <span className="text-gray-400 font-mi-sans">
            {t("total_nights", {
              days: get(reservation, "price.total_nights")
            })}
          </span>
        </div>
        <span className="text-base font-mi-sans text-gray-300 line-through">
          {amountWithoutDiscount}
        </span>
      </div>
      <div className="flex justify-between items-center font-mi-sans">
        <span>{!hideCouponCode && <ApplyCouponCodeComponent />}</span>
        <span className="text-primary text-28">
          {get(reservation, "price.final")}
        </span>
      </div>
    </div>
  );
};

export default ReservationCost;
