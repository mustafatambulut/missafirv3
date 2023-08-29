"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  map,
  get,
  clone,
  split,
  includes,
  upperCase,
  capitalize
} from "lodash";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import {
  IPaymentDetail,
  IReservationBody
} from "@/components/molecules/reservationBody/types";
import { percentage } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTotal } from "@/redux/features/reservationSlice/reservationSlice";

import Collapse from "@/components/atoms/collapse/Collapse";
import ReservationCost from "@/components/molecules/reservationCost/ReservationCost";

const ReservationBody = ({ className = "" }: IReservationBody) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const { total, payment, couponCode, isApplyCouponCode } = useAppSelector(
    (state) => state.reservationReducer
  );

  const nightlyTotal =
    get(payment, "nightlyRate") * get(payment, "reservationDay");
  const discountCouponCode = percentage(
    nightlyTotal,
    get(payment, "couponCodePercent")
  );

  const amountWithoutDiscount = nightlyTotal + get(payment, "extras.total");
  let tempTotal =
    amountWithoutDiscount -
    percentage(nightlyTotal, get(payment, "discountPercent"));

  const [paymentDetail, setPaymentDetail] = useState<Array<IPaymentDetail>>([
    {
      info: t("payment_nights", {
        cost: get(payment, "nightlyRate"),
        day: get(payment, "reservationDay")
      }),
      total: `${nightlyTotal} ₺`
    },
    {
      info: t("percent_discount", { percent: get(payment, "discountPercent") }),
      total: `-${percentage(nightlyTotal, get(payment, "discountPercent"))} ₺`
    },
    {
      info: capitalize(get(payment, "extras.label")),
      total: `${get(payment, "extras.total")} ₺`
    }
  ]);

  const infoClass = (info) => {
    return classNames("text-xs", {
      "text-primary": includes(split(info, " "), "(%10)")
    });
  };

  useEffect(() => {
    if (isApplyCouponCode) {
      tempTotal -= discountCouponCode;
      dispatch(changeTotal(tempTotal));
      const updated: Array<IPaymentDetail> = clone(paymentDetail);

      updated.push({
        info: t("discount_coupon_code", { couponCode: upperCase(couponCode) }),
        total: `${discountCouponCode} ₺`
      });
      setPaymentDetail(updated);
    }
  }, [isApplyCouponCode]);

  useEffect(() => {
    if (!total) dispatch(changeTotal(tempTotal));
  }, [total]);

  const PaymentDetailComponent = (): ReactNode => (
    <Collapse
      arrowColor="fill-primary-400"
      contentClass="font-mi-sans text-gray-400"
      titleClass="text-lg pb-3 text-primary-400"
      title={t("payment_details")}>
      <div className="flex flex-col gap-y-4">
        {map(paymentDetail, ({ info, total }, key) => (
          <div key={key} className="flex justify-between">
            <span className={infoClass(info)}>{info}</span>
            <span className="text-base text-gray-600">{total}</span>
          </div>
        ))}
      </div>
    </Collapse>
  );

  return (
    <div className={`${className}`}>
      <PaymentDetailComponent />
      <ReservationCost
        tempTotal={tempTotal}
        paymentDetail={paymentDetail}
        setPaymentDetail={setPaymentDetail}
        amountWithoutDiscount={amountWithoutDiscount}
      />
    </div>
  );
};

export default ReservationBody;
