"use client";
import { ReactNode, useEffect } from "react";
import { map, get } from "lodash";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IReservationBody } from "@/components/molecules/reservationBody/types";
import { changeTotal } from "@/redux/features/reservationSlice/reservationSlice";

import Collapse from "@/components/atoms/collapse/Collapse";
import ReservationCost from "@/components/molecules/reservationCost/ReservationCost";
import ReservationHeader from "@/components/atoms/reservationHeader/ReservationHeader";

const ReservationBody = ({
  className = "",
  hideCouponCode,
  isDateSummary
}: IReservationBody) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const { total, reservation } = useAppSelector((st) => st.reservationReducer);

  useEffect(() => {
    if (!total) dispatch(changeTotal(0));
  }, [total]);

  const PaymentDetailComponent = (): ReactNode => (
    <Collapse
      closeOnOutsideClick={false}
      arrowColor="fill-primary-400"
      contentClass="font-mi-sans text-gray-400"
      titleClass="text-lg text-primary-400 justify-start lg:justify-between"
      titlePlacement="justify-start lg:justify-between"
      title={t("payment_details")}>
      <div className="flex flex-col gap-y-1">
        {map(
          get(reservation, "price.breakdown"),
          ({ label, value, extra }, key) => {
            return extra ? (
              <div key={key} className="flex flex-col ">
                <div className="flex justify-between">
                  <span className="text-xs">{label}</span>
                  <span className="text-base text-gray-600">{value}</span>
                </div>
                <hr />
              </div>
            ) : (
              <div key={key} className="flex justify-between">
                <span className="text-xs">{label}</span>
                <span className="text-base text-gray-600">{value}</span>
              </div>
            );
          }
        )}
      </div>
    </Collapse>
  );

  return (
    <div className={`flex flex-col gap-y-4 ${className}`}>
      <div className="order-2 lg:order-1">
        <ReservationHeader isDateSummary={isDateSummary} />
      </div>
      {get(reservation, "is_available") && (
        <div className="order-1 lg:order-2">
          <PaymentDetailComponent />
        </div>
      )}
      {get(reservation, "is_available") && (
        <div className="order-3 flex flex-row justify-between items-center lg:flex-col w-full gap-y-4">
          <ReservationCost
            hideCouponCode={hideCouponCode}
            amountWithoutDiscount=""
          />
        </div>
      )}
    </div>
  );
};
export default ReservationBody;
