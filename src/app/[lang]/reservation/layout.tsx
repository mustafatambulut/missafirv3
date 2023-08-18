"use client";
import { get } from "lodash";
import Cards from "react-credit-cards-2";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { IReservationLayout } from "@/app/[lang]/reservation/types";

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
          {currentStep === 3 && (
            <div className="mb-4 lg:mb-0">
              <header className="mb-4 lg:hidden">
                <h1 className="text-22 text-center">
                  {isMobile ? "Payment" : "Safe and Secure Payment"}
                </h1>
                <h3 className="text-base text-gray-600 text-center lg:hidden">
                  Safe, secure transactions. Your personal information is
                  protected.
                </h3>
              </header>
              <Cards
                cvc={get(creditCard, "cvc")}
                name={get(creditCard, "name")}
                number={get(creditCard, "number")}
                expiry={get(creditCard, "expiry")}
                focused={get(creditCard, "focus")}
              />
            </div>
          )}
          <ReservationSummary data={payment} />
        </aside>
      </main>
    </section>
  );
};

export default ReservationLayout;
