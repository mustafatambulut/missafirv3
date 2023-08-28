"use client";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { formatPrice, getPriceFormatByLocale } from "@/utils/helper";

const ReservationHeader = () => {
  const t = useTranslations();
  const { payment } = useAppSelector((state) => state.reservationReducer);

  if (isMobile) return;

  return (
    <h2 className="text-2xl font-mi-sans font-normal text-gray-700">
      {formatPrice(get(payment, "nightlyRate"), getPriceFormatByLocale())}
      <span className="text-sm text-gray-400">{` /${t("nightly")}`}</span>
    </h2>
  );
};

export default ReservationHeader;