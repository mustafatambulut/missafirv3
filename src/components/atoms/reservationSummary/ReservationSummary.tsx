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
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

import {
  changeTotal,
  changeCurrentStep,
  changeIsApplyCoupon,
  changeIsShowCouponCode
} from "@/redux/features/reservationSlice/reservationSlice";
import {
  percentage,
  formatPrice,
  getScrollPosition,
  getPriceFormatByLocale
} from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { STEP_3, SUCCESS } from "@/redux/features/reservationSlice/enum";
import { IReservationSummary } from "@/components/atoms/reservationSummary/types";

import Alert from "@/components/atoms/alert/Alert";
import Button from "@/components/atoms/button/Button";
import Collapse from "@/components/atoms/collapse/Collapse";
import CouponCode from "@/components/atoms/couponCode/CouponCode";

import CancelIcon from "../../../../public/images/variants/close.svg";

const ReservationSummary = ({ data, className = "" }: IReservationSummary) => {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [isScrollActive, setIsScrollActive] = useState<boolean>(false);
  const { currentStep } = useAppSelector((state) => state.reservationReducer);

  const nightlyTotal = get(data, "nightlyRate") * get(data, "reservationDay");
  const discountCouponCode = percentage(
    nightlyTotal,
    get(data, "couponCodePercent")
  );
  const amountWithoutDiscount = nightlyTotal + get(data, "extras.total");
  let tempTotal =
    amountWithoutDiscount -
    percentage(nightlyTotal, get(data, "discountPercent"));

  const { total, couponCode, isApplyCouponCode, isShowCouponCode } =
    useAppSelector((state) => state.reservationReducer);

  const [paymentDetailContent, setPaymentDetailContent] = useState<any>([
    {
      info: t("payment_nights", {
        cost: get(data, "nightlyRate"),
        day: get(data, "reservationDay")
      }),
      total: formatPrice(nightlyTotal, getPriceFormatByLocale())
    },
    {
      info: t("percent_discount", { percent: get(data, "discountPercent") }),
      total: `-${formatPrice(
        percentage(nightlyTotal, get(data, "discountPercent")),
        getPriceFormatByLocale()
      )}`
    },
    {
      info: capitalize(get(data, "extras.label")),
      total: formatPrice(get(data, "extras.total"), getPriceFormatByLocale())
    }
  ]);

  const infoClass = (info) => {
    return classNames("text-xs", {
      "text-primary": includes(split(info, " "), "(%10)")
    });
  };
  const containerClass = classNames(
    `w-full h-fit bg-white px-5 py-2 lg:py-8 lg:relative lg:rounded-3xl border border-gray-100 shadow-lg shadow-black lg:shadow-gray-200 fixed bottom-0 z-50 lg:z-0 font-mi-sans-semi-bold ${className}`,
    {
      block: !isScrollActive,
      hidden: isScrollActive
    }
  );

  const handleCancelCoupon = (): void => dispatch(changeIsApplyCoupon(false));

  const handleApplyCouponCode = (): void => {
    dispatch(changeIsShowCouponCode(!isShowCouponCode));
  };

  const handleAlertCouponCode = (): void => {
    const updated = clone(paymentDetailContent);
    updated.pop();
    setPaymentDetailContent(updated);

    dispatch(changeTotal(tempTotal));
    dispatch(changeIsShowCouponCode(false));
  };

  const handleSubmitBtn = () => {
    dispatch(changeCurrentStep(SUCCESS));
    router.push("/reservation-success");
  };

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 300 : 0;
    setIsScrollActive(scrollPosition > requiredScrollPosition);
  };

  useEffect(() => {
    if (isApplyCouponCode) {
      tempTotal -= discountCouponCode;
      dispatch(changeTotal(tempTotal));
      const updated = clone(paymentDetailContent);

      updated.push({
        info: t("discount_coupon_code", { couponCode: upperCase(couponCode) }),
        total: formatPrice(discountCouponCode, getPriceFormatByLocale())
      });
      setPaymentDetailContent(updated);
    }
  }, [isApplyCouponCode]);

  useEffect(() => {
    if (!total) dispatch(changeTotal(tempTotal));
  }, [total]);

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const PaymentDetailComponent = (): ReactNode => (
    <Collapse
      arrowColor="fill-primary-400"
      contentClass="font-mi-sans text-gray-400"
      titleClass="text-lg pb-3 text-primary-400"
      title={t("payment_details")}>
      <div className="flex flex-col gap-y-4">
        {map(paymentDetailContent, ({ info, total }, key) => (
          <div key={key} className="flex justify-between">
            <span className={infoClass(info)}>{info}</span>
            <span className="text-base text-gray-600">{total}</span>
          </div>
        ))}
      </div>
    </Collapse>
  );

  const AlertComponent = (): ReactNode => {
    return (
      isApplyCouponCode && (
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
      )
    );
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

  const CostComponent = (): ReactNode => (
    <div className="mt-2 border-t-2 border-gray-200 border-dashed">
      {isShowCouponCode && (
        <div>
          <CouponCode />
        </div>
      )}
      <AlertComponent />
      <div className="mt-3 flex justify-between">
        <div className="flex text-lg gap-x-1">
          <span className="text-gray-800 font-mi-sans">
            {t("you_will_pay")}
          </span>
          <span className="text-gray-400 font-mi-sans">
            {t("total_nights", { days: get(data, "reservationDay") })}
          </span>
        </div>
        <span className="text-base font-mi-sans text-gray-300 line-through">
          {formatPrice(amountWithoutDiscount, getPriceFormatByLocale())}
        </span>
      </div>
      <div className="flex justify-between items-center font-mi-sans">
        <span>
          <ApplyCouponCodeComponent />
        </span>
        <span className="text-primary text-28">
          {formatPrice(total, getPriceFormatByLocale())}
        </span>
      </div>
    </div>
  );

  const HeaderComponent = (): ReactNode => {
    return (
      <>
        {!isMobile && (
          <h2 className="text-2xl font-mi-sans font-normal text-gray-700">
            {formatPrice(get(data, "nightlyRate"), getPriceFormatByLocale())}
            <span className="text-sm text-gray-400">{` /${t("nightly")}`}</span>
          </h2>
        )}
      </>
    );
  };
  const BodyComponent = (): ReactNode => (
    <div>
      <PaymentDetailComponent />
      <CostComponent />
    </div>
  );

  const FooterComponent = (): ReactNode => {
    return (
      <>
        {currentStep == STEP_3 ? (
          <Button
            className="text-xl font-mi-sans border-0 bg-gradient-to-tr from-[#E1004C] to-[#F8479E]"
            onClick={handleSubmitBtn}>
            {capitalize("submit")}
          </Button>
        ) : (
          <Button
            className="text-xl font-mi-sans border-0 bg-gradient-to-tr from-[#E1004C] to-[#F8479E]"
            onClick={() => alert("reserve")}>
            {/*todo: event eklenecek*/}
            {capitalize(t("reserve"))}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-6">
        <HeaderComponent />
        <BodyComponent />
        <FooterComponent />
      </div>
    </div>
  );
};

export default ReservationSummary;
