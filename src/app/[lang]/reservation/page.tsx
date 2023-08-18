"use client";
import { useAppSelector } from "@/redux/hooks";

import { STEP_1, STEP_2, STEP_3 } from "@/redux/features/reservationSlice/enum";

import PaymentSection from "@/components/organisms/paymentSection/PaymentSection";
import ConfirmationSection from "@/components/organisms/confirmationSection/ConfirmationSection";

const Reservation = () => {
  const { currentStep } = useAppSelector((step) => step.reservationReducer);

  switch (currentStep) {
    case STEP_1:
      return <ConfirmationSection />;
    case STEP_2:
      return <div>extra services</div>;
    case STEP_3:
      return <PaymentSection />;
  }
};

export default Reservation;
