"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { get, map, take } from "lodash";
import { useTranslations } from "use-intl";
import { isMobile } from "react-device-detect";

import { STATUS_CONFIRMATION } from "@/app/[lang]/reservation/constants";
import { IBookingDetail } from "@/components/organisms/bookingDetail/types";

import Collapse from "@/components/atoms/collapse/Collapse";
import Slider from "@/components/molecules/slider/Slider";

import Key from "../../../../public/images/key.svg";
import Clock from "../../../../public/images/clock.svg";
import BrokenLink from "../../../../public/images/broken_link.svg";

const BookingDetail = ({ className = "" }: IBookingDetail) => {
  const t = useTranslations();

  // todo: api bağlantısı sonrası kaldırılacak (hard coded datalar dahil)
  const mockReservation = {
    currentStep: 1,
    reservationStatus: STATUS_CONFIRMATION,
    title: "Stylish Apartment Near Popular Touristic Spots",
    location: "Antalya, Turkey",
    images: ["/images/image1.jpeg", "/images/image2.jpeg"],
    details: {
      homeRules: [
        {
          text: t("children_welcome_1_12_years"),
          img: "/images/approval.svg"
        },
        {
          text: t("infants_welcome_under_12_months"),
          img: "/images/approval.svg"
        },
        {
          text: t("no_parties_or_events"),
          img: "/images/delete.svg"
        },
        {
          text: t("no_smoking"),
          img: "/images/delete.svg"
        }
      ],
      properties: [`2 ${t("bedroom")}`, `1 ${t("bathroom")}`, "120 m²"]
    }
  };

  const HouseRulesComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-6">
        <h1 className="text-xl">{t("house_rules")}</h1>
        {map(get(mockReservation, "details.homeRules"), (rule, key) => (
          <div className="flex items-start gap-x-3" key={key}>
            <Image src={get(rule, "img")} width="22" height="22" alt="" />
            <p className="text-lg text-gray-500 font-normal font-mi-sans">
              {get(rule, "text")}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const PropertiesComponent = (): ReactNode => {
    return (
      <div className="flex gap-x-6 text-15 font-mi-sans text-gray-600">
        {map(get(mockReservation, "details.properties"), (prop, key) => (
          <span key={key}>{prop}</span>
        ))}
      </div>
    );
  };

  const KeyInfoComponent = (): ReactNode => {
    return (
      <div className="flex flex-col gap-y-8 text-gray-500 font-normal font-mi-sans">
        <h1 className="text-xl -mb-3 text-gray-800">{t("key_info")}</h1>
        <div className="flex gap-x-3">
          <Clock />
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-1">
              <span>Check-in from</span>
              <span>16:00</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span>Check-out by</span>
              <span>11:00</span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Key />
          <p>Self check-in with keybox</p>
        </div>
        <div className="flex gap-x-3">
          <BrokenLink />
          <p>Cancellation Policy</p>
        </div>
      </div>
    );
  };

  const MobileImageComponent = () => (
    <Slider
      sliderContainerClassName="lg:hidden"
      withPagination={true}
      sliderIdentifier="booking-slider"
      slidesPerView={isMobile ? 1 : 2}
      spaceBetween={isMobile ? 12 : 20}>
      {map(get(mockReservation, "images"), (src, key) => (
        <Image
          key={key}
          priority
          src={src}
          width={500}
          height={300}
          alt="image"
          className="rounded-3xl w-auto"
        />
      ))}
    </Slider>
  );

  const ImageComponent = () => (
    <div className="hidden lg:flex gap-x-5">
      {map(take(get(mockReservation, "images"), 2), (src, key) => (
        <Image
          key={key}
          priority
          src={src}
          width={440}
          height={248}
          alt="image"
          className="rounded-3xl 2xl:w-full"
        />
      ))}
    </div>
  );

  const AllDetailComponent = () => (
    <div className="gap-y-6 text-lg hidden lg:block">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        {t("all_details")}
      </h1>
      <div className="flex flex-row gap-x-60 xl:gap-x-80">
        <KeyInfoComponent />
        <HouseRulesComponent />
      </div>
    </div>
  );

  const MobileAllDetailComponent = () => (
    <Collapse
      className="gap-y-6 text-lg lg:hidden"
      titleClass="text-2xl font-semibold text-gray-800 border-b p-0"
      title={t("all_details")}>
      <div className="flex flex-col gap-y-6 gap-x-60">
        <KeyInfoComponent />
        <HouseRulesComponent />
      </div>
    </Collapse>
  );

  return (
    <div className={`flex flex-col gap-y-4 lg:gap-y-9 text-28 ${className}`}>
      <h1 className="text-22 font-semibold text-gray-800 py-0 my-0 lg:hidden">
        {t("confirmation")}
      </h1>
      <h1 className="text-28 font-semibold text-gray-800 hidden lg:block">
        {t("review_your_booking_details")}
      </h1>
      <section>
        {/*todo: refactor edilecek.*/}
        <ImageComponent />
        <MobileImageComponent />
      </section>
      <div>
        <div className="flex flex-col-reverse lg:flex-col">
          <h1 className="text-lg lg:text-28 font-semibold text-gray-800 mb-2 lg:mb-3">
            {get(mockReservation, "title")}
          </h1>
          <p className="lg:mb-4 text-lg text-gray-400 font-normal">
            {get(mockReservation, "location")}
          </p>
        </div>
        <PropertiesComponent />
      </div>
      <AllDetailComponent />
      <MobileAllDetailComponent />
    </div>
  );
};

export default BookingDetail;
