"use client";
import { useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import toNumber from "lodash/toNumber";
import { useSearchParams } from "next/navigation";

import {
  STEP_1,
  STEP_3,
  SUCCESS
} from "@/redux/features/reservationSlice/enum";
import { checkoutPreview } from "@/service/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeCurrentStep,
  setReservation
} from "@/redux/features/reservationSlice/reservationSlice";
import { setResPayload } from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { PAYLOAD_KEY } from "@/app/constants";
import { getLocalStorage } from "@/utils/helper";

import PaymentSection from "@/components/organisms/paymentSection/PaymentSection";
import SuccessSection from "@/components/organisms/successSection/SuccessSection";
import ConfirmationSection from "@/components/organisms/confirmationSection/ConfirmationSection";

const Reservation = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  // const stepParam = searchParams.get('step');

  const data: any = {};
  let _message: string = "";
  // const [message, setMessage] = useState<string>("");
  for (const [key, value] of searchParams?.entries()) {
    key === "step" &&
      (dispatch(changeCurrentStep(toNumber(value))), (data["step"] = true));
    key === "message" && (_message = value);
  }

  const submitCheckoutPreview = async () => {
    dispatch(setResPayload(JSON.parse(getLocalStorage(PAYLOAD_KEY))));

    const resp: any = await checkoutPreview(
      JSON.parse(getLocalStorage(PAYLOAD_KEY))
    );

    if (!resp.data?.error)
      dispatch(setReservation(get(resp.data, "data.item.reservation")));
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      submitCheckoutPreview();
    }
  }, [data]);

  const { currentStep } = useAppSelector((step) => step.reservationReducer);

  switch (currentStep) {
    case STEP_1:
      return <ConfirmationSection />;
    // todo: bu kısım sonradan aktif edilecek
    // case STEP_2:
    //   return <ExtraServicesSection />;
    case STEP_3:
      return <PaymentSection message={_message} />;
    case SUCCESS:
      return <SuccessSection />;
  }
};

export default Reservation;
