import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { get, has, map } from "lodash";
import { isMobile } from "react-device-detect";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Slider from "@/components/molecules/slider/Slider";

import LetterIcon from "../../../../public/images/letter.svg";
import UserIcon from "../../../../public/images/user_dark.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import PendingIcon from "../../../../public/images/waitround.svg";

const ReservationDetail = () => {
  // todo test için eklendi silinecek
  const mockReservation = {
    title: "Outstanding Flat with Calming View at Nisantasi",
    code: "HMDY9WNE29",
    platform: { name: "Airbnb", logo: "https://svgshare.com/i/wEt.svg" },
    location: "İstanbul, Beyoğlu",
    essentials: ["2 Bedroom", "1 Bathroom", "120 m2"],
    dates: "29 Mar - 8 Apr",
    nights: "8",
    guests: "3 guests",
    extraPayments: [
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
        type: "Transfer",
        image:
          "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
        type: "Transfer",
        image:
          "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
        type: "Transfer",
        image:
          "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
      }
    ],
    paymentDetails: {
      detail: [
        { title: "9,803,75₺ x 11 nights", price: "27,987 ₺" },
        { title: "25% Discount", price: "-4,987 ₺" },
        { title: "Cleaning Fee", price: "400 ₺" },
        { title: "Extra Payments", price: "100 ₺" }
      ],
      total: "16,889 ₺"
    },
    price: { amount: "9,803₺", type: "11 night" },
    status: {
      icon: <PendingIcon className="fill-white" />,
      type: "pending",
      color: "bg-warning",
      label: "Bekleniyor"
    },
    badges: [{ color: "primary", label: "M Homes" }],
    images: [
      {
        src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
      },
      {
        src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
      },
      {
        src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
      }
    ]
  };

  const statusClassName = classNames(
    "rounded text-white text-sm lg:text-xl font-mi-sans-semi-bold flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3",
    {
      "bg-success-green": get(mockReservation, "status.type") === "confirmed",
      "bg-warning-yellow": get(mockReservation, "status.type") === "pending",
      "bg-error-red": get(mockReservation, "status.type") === "cancelled"
    }
  );

  return (
    <>
      <Slider
        sliderIdentifier="reservation-detail"
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={10}>
        {map(get(mockReservation, "images"), (image, key) => {
          return (
            <div className="w-full h-60" key={key}>
              <Image
                src={get(image, "src")}
                alt="home"
                key={key}
                fill={true}
                className="object-cover rounded-xl"
              />
            </div>
          );
        })}
      </Slider>
      <div className="flex justify-start items-center">
        <div className={statusClassName}>
          {get(mockReservation, "status.label")}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <div className="text-sm lg:text-xl text-gray-700 flex items-center gap-1">
            <div className="h-7 w-7 relative">
              <Image
                src={get(mockReservation, "platform.logo")}
                alt={get(mockReservation, "platform.name")}
                fill={true}
                className="object-cover"
              />
            </div>
            {get(mockReservation, "code")}
          </div>
          <div className="text-lg lg:text-28 font-mi-sans-semi-bold text-gray-800">
            {get(mockReservation, "title")}
          </div>
          <div className="text-gray-500 text-base lg:text-xl">
            {get(mockReservation, "location")}
          </div>
        </div>
        <div className="rounded-lg cursor-pointer border-2 px-2 lg:px-4 py-1 text-primary-500 border-primary-500 text-sm lg:text-lg font-mi-sans-semi-bold flex justify-center items-center gap-3">
          <LetterIcon /> <span>Inbox</span>
        </div>
      </div>
      <div className="flex gap-x-4 text:base lg:text-2xl text-gray-600 font-mi-sans-semi-bold">
        {map(get(mockReservation, "essentials"), (essential, key) => {
          return <div key={key}>{essential}</div>;
        })}
      </div>
      <div className="flex gap-3">
        <div className="rounded-lg bg-gray-100 w-auto lg:w-1/2 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <CalendarIcon className="fill-gray-800 lg:scale-125" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-700">
              {get(mockReservation, "dates")}
            </div>
            <div className="text-gray-500 text-sm lg:text-lg">
              <span>{get(mockReservation, "nights")}-nights stay</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-100 w-auto lg:w-1/2 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <UserIcon className="fill-gray-800 scale-125 lg:scale-150" />
          </div>
          <div className="flex flex-col justify-center text-gray-700 text-base lg:text-xl">
            <div>{get(mockReservation, "guests")}</div>
          </div>
        </div>
      </div>
      {has(mockReservation, "extraPayments") && (
        <div>
          <div className="text-base lg:text-2xl font-mi-sans-semi-bold text-gray-800">
            Extra Payments
          </div>
          {isMobile ? (
            <div className="mt-3 gap-y-5 flex flex-col">
              {map(
                get(mockReservation, "extraPayments"),
                (extraPayment, key) => {
                  return (
                    <Card key={key} className="rounded-xl shadow-base-blur-5">
                      <div className="flex items-center justify-start">
                        <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                          <Image
                            src={get(extraPayment, "image")}
                            alt="home"
                            key={key}
                            fill={true}
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between px-2">
                          <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-800">
                            {get(extraPayment, "type")}
                          </div>
                          <div className="text-grey-500 text-xs lg:text-sm line-clamp-3 my-2">
                            {get(extraPayment, "content")}
                          </div>
                          <div className="text-primary text-lg lg:text-2xl mt-auto">
                            {get(extraPayment, "price.amount")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                }
              )}
            </div>
          ) : (
            <Slider
              sliderIdentifier="reservation-extra"
              sliderContainerClassName=""
              sliderWrapperClassName="py-2 px-1"
              slidesPerView={isMobile ? 1 : 2}
              spaceBetween={18}>
              {map(
                get(mockReservation, "extraPayments"),
                (extraPayment, key) => {
                  return (
                    <Card key={key} className="rounded-xl shadow-base-blur-5">
                      <div className="flex items-center justify-start">
                        <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                          <Image
                            src={get(extraPayment, "image")}
                            alt="home"
                            key={key}
                            fill={true}
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between px-2">
                          <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-800">
                            {get(extraPayment, "type")}
                          </div>
                          <div className="text-grey-500 text-xs lg:text-sm line-clamp-3 my-2">
                            {get(extraPayment, "content")}
                          </div>
                          <div className="text-primary text-lg lg:text-2xl mt-auto">
                            {get(extraPayment, "price.amount")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                }
              )}
            </Slider>
          )}
        </div>
      )}
      <div>
        <div tabIndex={0} className="collapse collapse-arrow !visible">
          <input type="checkbox" />
          <div className="collapse-title text-sm lg:text-28 font-mi-sans-semi-bold text-primary-400 pl-0 after:right-2 after:top-6">
            Payment Details
          </div>
          <div className="collapse-content px-0">
            <div className="border-b border-b-gray-200 pb-5 grid grid-cols-1 gap-3">
              {map(
                get(mockReservation, "paymentDetails.detail"),
                (payment, key) => (
                  <div
                    key={key}
                    className="flex w-full justify-between items-center">
                    <div className="text-gray-600 lg:text-xl text-xs">
                      {get(payment, "title")}
                    </div>
                    <div className="text-gray-700 lg:text-xl text-sm">
                      {get(payment, "price")}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex w-full justify-between items-center mt-5">
              <div className="text-base lg:text-2xl">
                <span className="text-gray-800 mr-2">Total Amount</span>
                <span className="text-gray-400">
                  (Total {get(mockReservation, "nights")} nights)
                </span>
              </div>
              <div className="text-primary text-base lg:text-28">
                <span className="font-mi-sans-semi-bold">
                  {get(mockReservation, "price.amount")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="mb-8">
          <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
            Comments
          </div>
          <div className="text-xs lg:text-xl text-gray-600">No comment yet</div>
        </div>

        <div>
          <div className="text-gray-700 text-sm lg:text-lg">
            Deneyiminiz nasıldı?
          </div>
          <div className="flex flex-col lg:flex-row rounded-xl b border items-end gap-3 mt-3 p-2">
            <textarea
              className="text-sm lg:text-xl text-gray-600 font-mi-sans-semi-bold textarea textarea-lg flex-1 w-full outline-none rounded-xl p-2"
              placeholder="Deneyiminiz nasıldı?"></textarea>
            <Button variant="btn-primary" className="text-sm lg:text-2xl">
              Send
            </Button>
          </div>
        </div>

        <div className="hidden">
          <div className="mb-8">
            <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
              Comments(1)
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="rounded-full shadow-thin-blur-10 w-[40px] h-[40px] flex justify-center items-center text-gray-600 text-base">
              JD
            </div>
            <div className="flex-1 rounded-xl b border text-sm lg:text-xl font-mi-sans-semi-bold text-gray-600 p-3">
              Hi, I wanted to check with you if its possible to check in at 2pm?
              I have a dental appointment at 2:30, the car is going to pick me
              up from your address.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationDetail;
