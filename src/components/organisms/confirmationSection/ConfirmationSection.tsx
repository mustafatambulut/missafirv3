"use client";
import { ReactNode } from "react";
import moment from "moment";
import Image from "next/image";
import dynamic from "next/dynamic";
import { get, map, take } from "lodash";
import { useTranslations } from "use-intl";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { IConfirmationSection } from "@/components/organisms/confirmationSection/types";

import Loading from "@/components/atoms/loading/Loading";
import Slider from "@/components/molecules/slider/Slider";
import ReservationConfirmationSkeleton from "@/components/molecules/skeletons/reservationConfirmationSkeleton/ReservationConfirmationSkeleton";

import BathIcon from "../../../../public/images/bath.svg";
import SquareIcon from "../../../../public/images/square.svg";
import PencilIcon from "../../../../public/images/pencil.svg";
import UserIcon from "../../../../public/images/user_dark.svg";
import BedroomIcon from "../../../../public/images/bedroom.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";

const AllDetail = dynamic(
  () => import("@/components/molecules/allDetail/AllDetail"),
  {
    ssr: false
  }
);

const ConfirmationSection = ({ className = "" }: IConfirmationSection) => {
  const router = useRouter();
  const t = useTranslations();
  const { detail } = useAppSelector((state) => state.reservationReducer);
  const { resPayload } = useAppSelector((state) => state.listingDetailReducer);
  if (!detail) return router.back();
// todosx
  const PropertiesComponent = (): ReactNode => {
    return (
      <article className="text-15 text-gray-600">
        <div className="flex gap-x-5 my-4">
          <div className="flex gap-x-2 items-center">
            <BedroomIcon className="hidden lg:block" />
            {get(detail, "item.rooms_bedrooms_count")}
            <span>{t("bedroom")}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <BathIcon className="hidden lg:block" />
            {get(detail, "item.rooms_bathrooms_count")}
            <span>{t("bathroom")}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <SquareIcon className="hidden lg:block" />
            {get(detail, "item.space")}
            <span>m²</span>
          </div>
        </div>
      </article>
    );
  };

  const MobileImageComponent = (): ReactNode => {
    return (
      <>
        {isMobile && (
          <Slider
            withPagination={true}
            sliderContainerClassName="lg:hidden"
            sliderIdentifier="booking-slider"
            slidesPerView={isMobile ? 1 : 2}
            spaceBetween={isMobile ? 12 : 20}>
            {map(get(detail, "item.pictures"), ({ path, caption }, key) => (
              <Image
                key={key}
                priority
                src={path || "/"}
                width={500}
                height={300}
                alt={caption}
                className="rounded-3xl w-auto"
              />
            ))}
          </Slider>
        )}
      </>
    );
  };

  const ImageComponent = (): ReactNode => (
    <div className="hidden lg:flex gap-x-5">
      {map(take(get(detail, "item.pictures"), 2), ({ path, caption }, key) => (
        <Image
          key={key}
          priority
          src={path || "/"}
          width={440}
          height={248}
          alt={caption}
          className="rounded-3xl 2xl:w-full"
        />
      ))}
    </div>
  );

  const renderInfoSection = () => {
    return isMobile ? (
      <div className="flex bg-gray-50 w-full lg:hidden p-3 justify-between items-center rounded-2xl">
        <div className="flex items-center gap-x-6">
          <div className="flex flex-col">
            <div className="flex gap-x-2 text-gray-800 font-mi-sans-semi-bold text-base">
              <div>{moment(get(detail, "check_in")).format("DD MMM")}</div>
              <span>-</span>
              <div>{moment(get(detail, "check_out")).format("DD MMM")}</div>
            </div>
            <div className="text-gray-600 text-sm flex">
              {get(detail, "item.reservation.price.total_nights")}-
              {t("night_stay")}
            </div>
          </div>
          <PencilIcon />
        </div>
        <div className="flex items-center gap-x-6">
          <div className="flex flex-col">
            <div className="text-sm text-gray-600">{t("total_guest")}</div>
            <div className="text-base text-gray-800 font-mi-sans-semi-bold">
              {get(detail, "adults") || 1} {t("guest")}
            </div>
          </div>
          <PencilIcon />
        </div>
      </div>
    ) : (
      <div className="flex gap-5 flex-wrap">
        <div className="flex bg-gray-100 py-3 px-4 rounded-xl  gap-x-4 items-center">
          <div>
            <CalendarIcon className="fill-gray-800 scale-125" />
          </div>
          <div>
            <h5 className="text-xl text-gray-700 font-semibold">
              {t("check_in")}
            </h5>
            <p className="text-lg text-gray-500">{`${moment(
              get(resPayload, "check_in")
            ).format("DD MMM YYYY")} ${get(detail, "item.check_in_time")}`}</p>
          </div>
        </div>
        <div className="flex bg-gray-100 py-3 px-4 rounded-xl  gap-x-4 items-center">
          <div>
            <CalendarIcon className="fill-gray-800 scale-125" />
          </div>
          <div>
            <h5 className="text-xl text-gray-700 font-semibold">
              {t("check_out")}
            </h5>
            <p className="text-lg text-gray-500">
              {`${moment(get(resPayload, "check_out")).format(
                "DD MMM YYYY"
              )} ${get(detail, "item.check_out_time")}`}
            </p>
          </div>
        </div>
        <div className="flex bg-gray-100 py-3 px-4 rounded-xl  gap-x-4 items-center">
          <div>
            <UserIcon className="fill-gray-800 scale-150" />
          </div>
          <div>
            <h5 className="text-xl text-gray-500 text-gray-700 font-semibold">
              {get(resPayload, "adults") || get(detail, "adults")} {t("guest")}
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Loading isLoading={!detail} loader={<ReservationConfirmationSkeleton />}>
      <div className={`flex flex-col gap-y-4 lg:gap-y-9 text-28 ${className}`}>
        <h1 className="text-22 text-center font-semibold text-gray-800 py-0 my-0 lg:hidden">
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
              {get(detail, "item.title")}
            </h1>
            <p className="lg:mb-4 text-lg text-gray-400 font-normal">
              {`${get(detail, "item.district.name")}, ${get(
                detail,
                "item.city.name"
              )}`}
            </p>
          </div>
          <PropertiesComponent />
          {renderInfoSection()}
        </div>
        <AllDetail
          detail={{
            self_check_in: get(detail, "item.self_check_in"),
            check_in_time: get(detail, "item.check_in_time"),
            check_out_time: get(detail, "item.check_out_time"),
            cancelation_policy: get(detail, "item.cancelation_policy"),
            house_rules: get(detail, "item.house_rules")
          }}
        />
      </div>
    </Loading>
  );
};

export default ConfirmationSection;
