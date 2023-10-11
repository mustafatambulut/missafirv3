"use client";
import { get, omit } from "lodash";
import { useTranslations } from "next-intl";

import {
  setReservation,
  changeIsApplyCoupon
} from "@/redux/features/reservationSlice/reservationSlice";
import { basket } from "@/service/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Alert from "@/components/atoms/alert/Alert";

import CancelIcon from "../../../../public/images/variants/close.svg";
import { setResPayload } from "@/redux/features/listingDetailSlice/listingDetailSlice";

const AlertCouponCode = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { resPayload } = useAppSelector((state) => state.listingDetailReducer);
  const handleCancelCoupon = async (): void => {
    const queryParams = omit(resPayload, ["coupon_code"]);
    dispatch(setResPayload(queryParams));

    const { data } = await basket(queryParams);
    dispatch(setReservation(get(data, "data.item.reservation")));
    dispatch(changeIsApplyCoupon(false));
  };

  return (
    <Alert
      variant="danger"
      title={t("coupon_applied")}
      icon={
        <CancelIcon
          onClick={handleCancelCoupon}
          className="cursor-pointer fill-primary"
        />
      }
    />
  );
};

export default AlertCouponCode;
