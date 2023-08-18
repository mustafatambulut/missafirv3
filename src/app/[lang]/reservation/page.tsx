"use client";
import { useAppSelector } from "@/redux/hooks";

import PaymentSection from "@/components/organisms/paymentSection/PaymentSection";
import ConfirmationSection from "@/components/organisms/confirmationSection/ConfirmationSection";

const Reservation = () => {
  const { currentStep } = useAppSelector((step) => step.reservationReducer);

  switch (currentStep) {
    case 1:
      return <ConfirmationSection />;
    case 2:
      return <div>extra services</div>;
    case 3:
      return <PaymentSection />;
  }
};

export default Reservation;
