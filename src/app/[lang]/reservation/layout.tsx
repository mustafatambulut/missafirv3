"use client";
import classNames from "classnames";

import { useAppSelector } from "@/redux/hooks";
import { IReservationLayout } from "@/app/[lang]/reservation/types";
import { STEP_3, SUCCESS } from "@/redux/features/reservationSlice/enum";

import CreditCard from "@/components/atoms/creditCard/CreditCard";
import ReservationSummary from "@/components/atoms/reservationSummary/ReservationSummary";
import ProgressBar from "@/components/molecules/progressBar/ProgressBar";

import "./Reservation.css";

const ReservationLayout = ({ children }: IReservationLayout) => {
  const { payment, currentStep } = useAppSelector(
    (state) => state.reservationReducer
  );
  const { creditCard } = useAppSelector((state) => state.paymentReducer);

  const isSuccess = currentStep === SUCCESS;

  const sectionClass = classNames("font-mi-sans", {
    "lg:w-2/3 px-4 lg:px-0": !isSuccess
  });

  const mainClass = classNames("", {
    "flex lg:flex-row flex-col-reverse gap-x-20": !isSuccess
  });

  return (
    <section className="mt-20 lg:mt-28 flex flex-col gap-y-10 lg:gap-y-20 relative px-0 lg:px-10">
      {!isSuccess && (
        <nav className="flex justify-center gap-x-10 lg:gap-x-72 px-4 lg:px-10">
          <ProgressBar />
        </nav>
      )}
      <main className={mainClass}>
        <section className={sectionClass}>{children}</section>
        {!isSuccess && (
          <aside className="lg:flex lg:flex-col lg:gap-y-6 lg:w-1/3">
            {currentStep === STEP_3 && <CreditCard data={creditCard} />}
            <ReservationSummary data={payment} />
          </aside>
        )}
      </main>
    </section>
  );
};

export default ReservationLayout;
