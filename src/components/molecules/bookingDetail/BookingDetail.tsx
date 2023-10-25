"use client";
import { get, map } from "lodash";
import { useTranslations } from "next-intl";

import { useAppSelector } from "@/redux/hooks";

import Collapse from "@/components/atoms/collapse/Collapse";
import Typography from "@/components/atoms/typography/Typography";

const BookingDetail = () => {
  const t = useTranslations();
  const reservation = useAppSelector((st) => st.reservationReducer.reservation);

  return (
    <>
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
      <div className="flex flex-col lg:flex-row lg:items-center items-start justify-center lg:justify-between w-full">
        <div className="flex flex-col gap-y-1">
          <div className="flex text-lg gap-x-1">
            <Typography
              variant="p4"
              element="span"
              className="text-gray-800 font-mi-sans">
              {t("you_will_pay")}
            </Typography>
            <Typography
              variant="p4"
              element="span"
              className="text-gray-400 font-mi-sans">
              {t("total_nights", {
                days: get(reservation, "price.total_nights")
              })}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <Typography
            variant="h4"
            element="span"
            className="text-primary text-28">
            {get(reservation, "price.final")}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
