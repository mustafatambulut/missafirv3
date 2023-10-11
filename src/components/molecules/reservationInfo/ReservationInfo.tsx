import { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useTranslations } from "use-intl";
import { capitalize, get, map } from "lodash";

import { IReservationInfo } from "@/components/molecules/reservationInfo/types";

import Button from "@/components/atoms/button/Button";
import ReservationDate from "@/components/atoms/reservationDate/ReservationDate";
import PaymentDetails from "@/components/molecules/paymentDetails/PaymentDetails";

import Key from "../../../../public/images/key.svg";
import Clock from "../../../../public/images/clock.svg";
import LetterIcon from "../../../../public/images/letter.svg";
import UserIcon from "../../../../public/images/user_dark.svg";
import Confirmed from "../../../../public/images/confirmed.svg";
import Cancelled from "../../../../public/images/cancelled.svg";
import BrokenLink from "../../../../public/images/broken_link.svg";
import Typography from "@/components/atoms/typography/Typography";

const ReservationInfo = ({ reservation }: IReservationInfo) => {
  const t = useTranslations();
  const statusClassName = classNames(
    "rounded text-white text-sm lg:text-xl font-mi-sans-semi-bold flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3"
  );
  const HouseRulesComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-6">
        <Typography
          variant="h6"
          element="h6"
          className="font-mi-sans-semi-bold">
          {t("house_rules")}
        </Typography>
        {map(get(reservation, "listing.house_rules"), (rule, key) => (
          <div className="flex items-start gap-x-3" key={key}>
            <Typography
              variant="p3"
              element="p"
              className="text-gray-500 font-normal font-mi-sans flex gap-x-2 items-center">
              {get(rule, "status") ? (
                <Confirmed className="fill-primary" />
              ) : (
                <Cancelled className="fill-gray-600" />
              )}
              {get(rule, "title")}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  const KeyInfoComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-8 text-gray-600 font-normal font-mi-sans text-base lg:text-lg">
        <Typography
          variant="h6"
          element="h6"
          className=" -mb-3 text-gray-800 font-mi-sans-semi-bold">
          {t("key_info")}
        </Typography>
        <div className="flex flex-col gap-y-1">
          <Typography
            variant="p3"
            element="span"
            className="font-mi-sans-semi-bold">
            {t("confirmation_code")}
          </Typography>
          <Typography variant="p3" element="span" className="text-gray-600">
            {get(reservation, "confirmation_code")}
          </Typography>
        </div>
        <div className="flex gap-x-3">
          <Clock />
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-1">
              <Typography
                variant="p3"
                element="span"
                className="font-mi-sans-semi-bold">
                {t("check_in_form")}
              </Typography>
              <Typography variant="p3" element="span">
                {get(reservation, "listing.check_in_time")}
              </Typography>
            </div>
            <div className="flex flex-col gap-y-1">
              <Typography
                variant="p3"
                element="span"
                className="font-mi-sans-semi-bold">
                {t("check_out_by")}
              </Typography>
              <Typography variant="p3" element="span">
                {get(reservation, "listing.check_out_time")}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Key />
          <Typography variant="p3" element="span">
            {t("self_check_in_with_keybox")}
          </Typography>
        </div>
        {get(reservation, "listing.cancelation_policy") && (
          <div className="flex gap-x-3">
            <BrokenLink />
            <Typography variant="p3" element="span">
              {t("cancelation_policy")}
            </Typography>
          </div>
        )}
      </div>
    );
  };

  const ReservationDetailsComponent = () => (
    <div className="gap-y-6 text-lg">
      <Typography variant="h5" element="h2" className="mb-6 text-gray-800">
        {t("reservation_details")}
      </Typography>
      <div className="flex flex-col lg:flex-row gap-y-5 justify-between">
        <KeyInfoComponent />
        <HouseRulesComponent />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className={statusClassName}
          style={{ backgroundColor: get(reservation, "status.hex") }}>
          {capitalize(get(reservation, "status.title"))}
        </div>
        <Link
          href={`/inbox?recent=1&id=${get(reservation, "message_thread_id")}`}>
          <div className="rounded-lg cursor-pointer border-2 px-2 lg:px-4 py-1 text-primary-500 border-primary-500 flex justify-center items-center gap-3">
            <LetterIcon className="fill-primary" />{" "}
            <Typography variant="p3" element="span">
              {t("inbox")}
            </Typography>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <Typography variant="h3" element="h3" className="text-gray-800">
            {get(reservation, "listing.title")}
          </Typography>
          <Typography variant="p2" element="div" className="text-gray-500">
            {get(reservation, "listing.address")}
          </Typography>
        </div>
      </div>
      <div className="flex gap-x-4 text:base lg:text-2xl text-gray-600 font-mi-sans-semi-bold">
        {get(reservation, "listing.rooms_bedrooms_count") && (
          <Typography variant="p1" element="div">
            {get(reservation, "listing.rooms_bedrooms_count")} {t("bedroom")}
          </Typography>
        )}
        {get(reservation, "listing.rooms_bathrooms_count") && (
          <Typography variant="p1" element="div">
            {get(reservation, "listing.rooms_bathrooms_count")} {t("bathroom")}
          </Typography>
        )}
        {get(reservation, "listing.space") && (
          <Typography variant="p1" element="div">
            {get(reservation, "listing.space")} <span>{t("m2")}</span>
          </Typography>
        )}
      </div>
      <div className="flex justify-start">
        <Button
          variant="btn-ghost"
          link={`https://www.google.com/maps/search/?api=1&query=${get(
            reservation,
            "listing.lat"
          )},${get(reservation, "listing.lng")}`}
          target="_blank"
          className="text-base lg:text-lg text-primary font-mi-sans-semi-bold pl-0">
          {t("get_direction")}
        </Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ReservationDate
          reservationDate={get(reservation, "check_in") || ""}
          reservationTime={get(reservation, "listing.check_in_time") || ""}
          label={t("check_in")}
        />
        <ReservationDate
          reservationDate={get(reservation, "check_out") || ""}
          reservationTime={get(reservation, "listing.check_out_time") || ""}
          label={t("check_out")}
        />
        <div className="rounded-lg bg-gray-50 w-auto lg:flex-1 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <UserIcon className="fill-gray-800 scale-125 lg:scale-150" />
          </div>
          <div className="flex text-gray-700 text-base lg:text-xl gap-x-3">
            <Typography variant="p1" element="div">
              {get(reservation, "guests")}
            </Typography>
            <Typography variant="p1" element="div" className="hidden lg:block">
              {t("guests")}
            </Typography>
          </div>
        </div>
      </div>

      <ReservationDetailsComponent />
      {/*{has(reservation, "extraPayments") && (*/}
      {/*  <ExtraPayments reservation={reservation} />*/}
      {/*)}*/}
      <PaymentDetails payment={get(reservation, "price")} />

      {/*<ReservationComments />*/}
    </>
  );
};

export default ReservationInfo;
