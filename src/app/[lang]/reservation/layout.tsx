"use client";
import { useAppSelector } from "@/redux/hooks";
import { STEP_3 } from "@/redux/features/reservationSlice/enum";
import { IReservationLayout } from "@/app/[lang]/reservation/types";

import CreditCard from "@/components/atoms/creditCard/CreditCard";
import ReservationSummary from "@/components/atoms/reservationSummary/ReservationSummary";
import ProgressBar from "@/components/molecules/progressBar/ProgressBar";

import "./Reservation.css";

const ReservationLayout = ({ children }: IReservationLayout) => {
  const { payment, currentStep } = useAppSelector(
    (state) => state.reservationReducer
  );
  const { creditCard } = useAppSelector((state) => state.paymentReducer);

  return (
    <section className="mt-20 lg:mt-28 flex flex-col gap-y-10 lg:gap-y-20 relative px-0 lg:px-10">
      <nav className="flex justify-center gap-x-10 lg:gap-x-72 px-4 lg:px-10">
        <ProgressBar />
      </nav>
      <main className="flex lg:flex-row flex-col-reverse gap-x-20">
        <section className="lg:w-2/3 px-4 lg:px-0 font-mi-sans">
          {children}
        </section>
        <aside className="lg:flex lg:flex-col lg:gap-y-6 lg:w-1/3">
          {currentStep === STEP_3 && <CreditCard data={creditCard} />}
          <ReservationSummary data={payment} />
        </aside>
      </main>
    </section>
  );
};

export default ReservationLayout;
