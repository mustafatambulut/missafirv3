"use client";
import { useEffect, useState } from "react";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import pick from "lodash/pick";
import split from "lodash/split";
import assign from "lodash/assign";
import compact from "lodash/compact";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import capitalize from "lodash/capitalize";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import {
  setReservation,
  changeCurrentStep,
  changeIsPressReservButton
} from "@/redux/features/reservationSlice/reservationSlice";
import { PAYLOAD_KEY } from "@/app/constants";
import { basket, checkoutPreview } from "@/service/api";
import { checkIsAuthenticated, setLocalStorage } from "@/utils/helper";
import { setHtml } from "@/redux/features/bankSlice/bankSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ResPayload } from "@/redux/features/listingDetailSlice/types";
import { STEP_1, STEP_3 } from "@/redux/features/reservationSlice/enum";
import { setIsValidPayload } from "@/redux/features/paymentSlice/paymentSlice";
import { REQUIRED_PARAM_COUNT } from "@/components/molecules/reservationFooter/constants";

import Button from "@/components/atoms/button/Button";

const ReservationFooter = () => {
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSnipper, setIsLoadingSnipper] = useState<boolean>(false);

  const { creditCard } = useAppSelector((state) => state.paymentReducer);
  const { resPayload } = useAppSelector((state) => state.listingDetailReducer);
  const { currentStep } = useAppSelector((state) => state.reservationReducer);

  const btnClass = classNames(`text-xl font-mi-sans border-0 lg:w-full`, {
    "bg-gradient-to-tr from-[#E1004C] to-[#F8479E]": !isLoading,
    "bg-gray-100": isLoading
  });

  const validateQueryParams = (resPayload: ResPayload): boolean => {
    const checkParams = map(resPayload, (val, key) => {
      if (key === "adults" && val >= 1) return true;

      if (includes(["check_in", "check_out", "slug"], key) && !isEmpty(val)) {
        return true;
      }
    });
    return size(compact(checkParams)) === REQUIRED_PARAM_COUNT;
  };

  useEffect(() => {
    creditCard?.distance && creditCard?.preliminary
      ? setIsLoading(false)
      : setIsLoading(true);
  }, [creditCard]);

  const handleSubmitBtn = async () => {
    dispatch(setIsValidPayload(validateQueryParams(resPayload)));
    if (!validateQueryParams(resPayload)) return;
    setIsLoading(true);
    setIsLoadingSnipper(true);
    const { number, expiry, cvc, name, message } = creditCard;
    const { data } = await checkoutPreview({
      card_cvc: cvc,
      card_expiry: expiry,
      card_holder_name: name,
      card_number: number,
      message: message,
      ...resPayload
    });

    if (get(data, "code") === 200) {
      setLocalStorage(PAYLOAD_KEY, JSON.stringify(resPayload));
      if (get(data, "data.redirectUrl")) {
        dispatch(setHtml(get(data, "data.redirectUrl")));
        return router.push("/garanti");
      }
    }
    setIsLoading(false);
    setIsLoadingSnipper(false);
  };

  const handleConfirmationBtn = async () => {
    if (!get(resPayload, "check_in") && !get(resPayload, "check_out")) {
      return;
    }

    setIsLoading(true);
    setIsLoadingSnipper(true);
    dispatch(changeIsPressReservButton(true));
    if (checkIsAuthenticated()) {
      const result = includes(split(path, "/"), "reservation")
        ? await checkoutPreview(resPayload)
        : await basket(resPayload);
      const { data } = result;

      get(data, "data.item.reservation") &&
        (assign(
          get(data, "data.item.reservation"),
          pick(get(data, "data.item"), [
            "terms0_content",
            "terms0_title",
            "terms1_content",
            "terms1_title",
            "cancelation_policy"
          ])
        ),
        dispatch(setReservation(get(data, "data.item.reservation"))));

      get(data, "data") && router.push("/reservation");

      dispatch(
        changeCurrentStep(
          !includes(split(path, "/"), "reservation") ? STEP_1 : STEP_3
        )
      );
    } else {
      return router.push("/login");
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setIsLoadingSnipper(false);
  }, [currentStep]);

  switch (currentStep) {
    case STEP_1:
      return (
        <Button
          disabled={isLoading}
          className={btnClass}
          onClick={handleConfirmationBtn}>
          {capitalize(t("reserve"))}
          {isLoading && <span className="loading loading-spinner"></span>}
        </Button>
      );
    // todo: bu kısım sonradan aktif edilecek
    // case STEP_2:
    //   return (
    //     <>
    //       <Button
    //         disabled={true}
    //         className="hidden lg:block text-xl font-mi-sans border-0 enabled:bg-gradient-to-tr enabled:from-[#E1004C] to-[#F8479E]">
    //         {capitalize(t("reserve"))}
    //       </Button>
    //       <Button
    //         outline={true}
    //         variant="btn-ghost"
    //         className="text-primary text-xl font-mi-sans"
    //         onClick={() => dispatch(changeCurrentStep(STEP_3))}>
    //         Skip Extra Services
    //       </Button>
    //     </>
    //   );
    case STEP_3:
      return (
        <Button
          className={btnClass}
          onClick={handleSubmitBtn}
          disabled={isLoading}>
          {capitalize(t("submit"))}
          {isLoadingSnipper && (
            <span className="loading loading-spinner"></span>
          )}
        </Button>
      );
  }
};

export default ReservationFooter;
