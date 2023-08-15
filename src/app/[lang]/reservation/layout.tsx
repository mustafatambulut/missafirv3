"use client";
import { useAppSelector } from "@/redux/hooks";

import { IReservationLayout } from "@/app/[lang]/reservation/types";

import ProgressBar from "@/components/molecules/progressBar/ProgressBar";
import ReservationSummary from "@/components/atoms/reservationSummary/ReservationSummary";

export const ReservationLayout = ({ children }: IReservationLayout) => {
  const { payment } = useAppSelector((state) => state.reservationReducer);

  return (
    <section className="mt-20 lg:mt-28 relative px-0 lg:px-10">
      <nav className="flex justify-center gap-x-10 lg:gap-x-72 px-4 lg:px-10">
        <ProgressBar />
      </nav>
      <main className="flex lg:flex-row flex-col gap-x-5 mt-12">
        <section className="lg:w-2/3 px-4 lg:px-0 font-mi-sans">
          {children}
        </section>
        <aside className="lg:flex lg:w-1/3">
          <ReservationSummary data={payment} />
        </aside>
      </main>
    </section>
  );
};

export default ReservationLayout;
