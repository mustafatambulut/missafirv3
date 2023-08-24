"use client";
import { useRouter } from "next/navigation";

import useCheckAuth from "@/app/[lang]/reservation/useCheckAuth";
import { ISuccessSection } from "@/components/organisms/successSection/types";

import Button from "@/components/atoms/button/Button";

import HeartImage from "../../../../public/images/heart.svg";
import CareIcon from "../../../../public/images/variants/care.svg";
import BackgroundImage from "../../../../public/images/missafir_background.svg";

const SuccessSection = ({ className = "" }: ISuccessSection) => {
  useCheckAuth();
  const router = useRouter();

  return (
    <div className={`static ${className}`}>
      <div className="static">
        <div className="flex justify-center p-5 lg:p-10 mt-20 h-full">
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
              <Button onClick={() => router.push("/profile/reservations")}>
                Reservation Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-36 z-0 hidden lg:block">
        <HeartImage />
      </div>
      <div className="absolute -bottom-28 left-0 z-0 hidden lg:block">
        <BackgroundImage />
      </div>
    </div>
  );
};

export default SuccessSection;
