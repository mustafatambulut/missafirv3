"use client";
import { useState } from "react";
import { get, trim } from "lodash";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import {
  changeCouponCode,
  changeIsApplyCoupon,
  changeIsShowCouponCode
} from "@/redux/features/reservationSlice/reservationSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ICouponCode } from "@/components/atoms/couponCode/types";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

const CouponCode = ({ className = "" }: ICouponCode) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [text, setText] = useState(null);

  const buttonClass = classNames("", {
    "bg-gray-100 text-gray-300": !text,
    "btn-primary": text
  });

  const handleOnChange = (e) => setText(trim(get(e, "target.value")));

  const handleOnClick = () => {
    dispatch(changeCouponCode(text));
    dispatch(changeIsApplyCoupon(true));
    dispatch(changeIsShowCouponCode(false));
  };

  return (
    <div className={`flex items-end gap-x-3 ${className}`}>
      <Input
        onChange={handleOnChange}
        value={text}
        className="text-base"
        label={t("apply_coupon_code")}
        placeholder={t("coupon_code")}
        position="top-left"
      />
      <Button onClick={handleOnClick} disabled={!text} variant={buttonClass}>
        {t("apply")}
      </Button>
    </div>
  );
};

export default CouponCode;
