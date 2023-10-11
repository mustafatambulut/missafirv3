"use client";
import { ReactNode } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { compact, difference, get, head, split } from "lodash";

import { LOCALES } from "@/app/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { STEP_1 } from "@/redux/features/reservationSlice/enum";
import { IReservationCost } from "@/components/molecules/reservationCost/types";
import { changeIsShowCouponCode } from "@/redux/features/reservationSlice/reservationSlice";

import CouponCode from "@/components/atoms/couponCode/CouponCode";
import AlertCouponCode from "@/components/atoms/alertCouponCode/AlertCouponCode";
import ReservationFooter from "@/components/molecules/reservationFooter/ReservationFooter";
import Typography from "@/components/atoms/typography/Typography";

const ReservationCost = ({
  className = "",
  hideCouponCode,
  amountWithoutDiscount
}: IReservationCost) => {
  const t = useTranslations();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { currentStep, reservation, isApplyCouponCode, isShowCouponCode } =
    useAppSelector((state) => state.reservationReducer);

  const path = head(difference(compact(split(pathName, "/")), LOCALES));

  const costClass = classNames(`w-full ${className}`, {
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
      isShowCouponCode &&
      currentStep === STEP_1 && (
        <div className="mb-3">
          <CouponCode />
        </div>
      )
    );
  };

  const AlertCouponCodeComponent = (): ReactNode => {
    return isApplyCouponCode && currentStep === STEP_1 && <AlertCouponCode />;
  };

  return (
    <div className={costClass}>
      <CouponCodeComponent />
      <AlertCouponCodeComponent />
      <div className="flex justify-between items-center lg:items-center gap-y-3 flex-row lg:flex-col">
        <div className="flex flex-col lg:flex-row lg:items-center items-start justify-center lg:justify-between w-full">
          <div className="flex flex-col gap-y-1">
            <div className="flex text-lg gap-x-1">
              <Typography variant="p3" element="span" className="text-gray-800 font-mi-sans">
                {t("you_will_pay")}
              </Typography>
              <Typography variant="p3" element="span" className="text-gray-400 font-mi-sans">
                {t("total_nights", {
                  days: get(reservation, "price.total_nights")
                })}
              </Typography>
            </div>
            {!!hideCouponCode &&
              currentStep === STEP_1 &&
              path === "reservation" && (
                <span className="absolute top-[.6rem] right-[1.2rem] lg:static z-50">
                  <ApplyCouponCodeComponent />
                </span>
              )}
          </div>
          <div className="flex flex-col justify-end items-end">
            <Typography variant="p4" element="span" className="font-mi-sans text-gray-300 line-through">
              {amountWithoutDiscount}
            </Typography>
            <Typography variant="h4" element="span" className="text-primary text-28">
              {get(reservation, "price.final")}
            </Typography>
          </div>
        </div>
        <ReservationFooter />
      </div>
    </div>
  );
};

export default ReservationCost;
