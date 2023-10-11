"use client";
import { useState } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { get, isUndefined, toNumber, trim } from "lodash";

import {
  setReservation,
  changeCouponCode,
  changeIsApplyCoupon,
  changeIsShowCouponCode
} from "@/redux/features/reservationSlice/reservationSlice";
import { checkoutPreview } from "@/service/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ICouponCode } from "@/components/atoms/couponCode/types";
import { setResPayload } from "@/redux/features/listingDetailSlice/listingDetailSlice";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

const CouponCode = ({ className = "" }: ICouponCode) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { resPayload, bookingDate } = useAppSelector(
    (state) => state.listingDetailReducer
  );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  const buttonClass = classNames("", {
    "bg-gray-100 text-gray-300": !couponCode,
    "btn-primary": couponCode
  });

  const handleOnChange = (e) => {
    errorMessage && setErrorMessage("");
    setCouponCode(trim(get(e, "target.value")));
  };

  const handleOnClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const payload = {
      ...resPayload,
      coupon_code: couponCode,
      check_in: get(bookingDate, "startDate").format("YYYY-MM-DD"),
      check_out: get(bookingDate, "endDate").format("YYYY-MM-DD"),
      adults: toNumber(get(bookingGuests, "adults")),
      kids: toNumber(get(bookingGuests, "kids")),
      pets: toNumber(get(bookingGuests, "pets"))
    };

    const { data } = await checkoutPreview(payload);
    if (
      !isUndefined(get(data, "data.item.reservation.coupon_code")) &&
      !get(data, "data.item.reservation.coupon_code")
    ) {
      setCouponCode("");
      setErrorMessage(get(data, "data.item.reservation.coupon_code_message"));
      setIsLoading(false);
    } else {
      dispatch(
        setResPayload({
          ...resPayload,
          coupon_code: couponCode
        })
      );
      dispatch(changeIsApplyCoupon(true));
      dispatch(changeCouponCode(couponCode));
      dispatch(changeIsShowCouponCode(false));
      dispatch(setReservation(get(data, "data.item.reservation")));
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className={`flex items-end gap-x-3 ${className}`}>
        <Input
          onChange={handleOnChange}
          value={couponCode}
          className="text-base"
          errormessage={errorMessage}
          label={t("apply_coupon_code")}
          placeholder={t("coupon_code")}
          position="top-left"
        />
        <Button
          onClick={handleOnClick}
          disabled={!couponCode || isLoading}
          variant={buttonClass}>
          {t("apply")}
          {isLoading && <span className="loading loading-spinner"></span>}
        </Button>
      </div>
      {errorMessage && (
        <span className="text-red-500 text-lg ml-1 font-mi-sans">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CouponCode;
