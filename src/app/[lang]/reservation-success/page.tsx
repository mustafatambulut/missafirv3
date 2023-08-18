"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hooks";
import { SUCCESS } from "@/redux/features/reservationSlice/enum";

import Button from "@/components/atoms/button/Button";

import HeartImage from "../../../../public/images/heart.svg";
import CareIcon from "../../../../public/images/variants/care.svg";
import BackgroundImage from "../../../../public/images/missafir_background.svg";

const ReservationSuccess = () => {
  const router = useRouter();
  const { currentStep } = useAppSelector((state) => state.reservationReducer);

  useEffect(() => {
    if (currentStep !== SUCCESS) return router.push("/reservation");
  }, [currentStep]);

  return (
    <div className="static">
      <div className="static">
        <div className="flex justify-center p-5 lg:p-10 mt-24 h-full">
          <div className="flex flex-col gap-y-9 py-14 rounded-xl shadow-bold-blur-20-dark z-20 bg-white">
            <div className="flex justify-center">
              <div className="flex w-16 h-16 lg:w-20 lg:h-20 bg-primary-100 items-center justify-center rounded-full">
                <CareIcon className="fill-[#ed2475]" />
              </div>
            </div>
            <div className="flex flex-col px-5 items-center justify-center gap-y-6">
              <h1 className="text-22 lg:text-28 text-center">
                You successfully created your booking
              </h1>
              <p className="font-mi-sans text-md lg:text-xl text-center text-gray-500">
                Your booking was successfull. You will receive a confirmation
                e-mail shortly. We hope you enjoy vacation!
              </p>
            </div>
            <div className="flex justify-center">
              {/*todo: reservasyon detay sayfasına yönlendirilecek*/}
              <Button onClick={() => alert("reservation-detail")}>
                Reservation Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-32 z-0 hidden lg:block">
        <HeartImage />
      </div>
      <div className="absolute bottom-20 left-0 z-0 hidden lg:block">
        <BackgroundImage />
      </div>
    </div>
  );
};

export default ReservationSuccess;
