"use client";
import { clone } from "lodash";
import { useTranslations } from "next-intl";

import {
  changeTotal,
  changeIsApplyCoupon,
  changeIsShowCouponCode
} from "@/redux/features/reservationSlice/reservationSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IAlertCouponCode } from "@/components/atoms/alertCouponCode/types";
import { IPaymentDetail } from "@/components/molecules/reservationBody/types";

import Alert from "@/components/atoms/alert/Alert";

import CancelIcon from "../../../../public/images/variants/close.svg";

const AlertCouponCode = ({
  tempTotal,
  paymentDetail,
  setPaymentDetail
}: IAlertCouponCode) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleCancelCoupon = (): void => dispatch(changeIsApplyCoupon(false));

  const handleAlertCouponCode = (): void => {
    const updated: Array<IPaymentDetail> = clone(paymentDetail);
    updated.pop();
    setPaymentDetail(updated);

    dispatch(changeTotal(tempTotal));
    dispatch(changeIsShowCouponCode(false));
  };

  return (
    <Alert
      variant="danger"
      title={t("coupon_applied")}
      onClick={handleAlertCouponCode}
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
