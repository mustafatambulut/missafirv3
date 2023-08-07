import React from "react";
import { map } from "lodash";
import Image from "next/image";
import { isMobile } from "react-device-detect";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Slider from "@/components/molecules/slider/Slider";

import CalendarIcon from "../../../../public/images/calendar.svg";
import UserIcon from "../../../../public/images/user_dark.svg";

const ReservationDetail = () => {
  return (
    <>
      <Slider
        sliderIdentifier="reservation-detail"
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={10}>
        {map([1, 2, 3, 4, 5], (item, key) => {
          return (
            <div className="w-[440px] h-[248px]">
              <Image
                //todo: ev1.jpeg ve ev2.jpeg geçici olarak eklendi silinecekler.
                src={key % 2 === 0 ? "/images/ev1.jpeg" : "/images/ev2.jpeg"}
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
        <div className="bg-success-green rounded text-white text-sm lg:text-xl font-mi-sans-semi-bold flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3">
          Onaylandı
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm lg:text-xl text-gray-700">HMDY9WNE29</div>
          <div className="text-lg lg:text-28 font-mi-sans-semi-bold text-gray-800">
            Stylish Apartment Near Popular Touristic Spot
          </div>
          <div className="text-gray-500 text-base lg:text-xl">
            Antalya, Turkey
          </div>
        </div>
        <div className="rounded-lg border-2 px-4 py-1 text-primary-500 border-primary-500 text-sm lg:text-lg font-mi-sans-semi-bold flex justify-center items-center">
          Inbox
        </div>
      </div>
      <div className="flex gap-x-4 text:base lg:text-2xl text-gray-600 font-mi-sans-semi-bold">
        <div>2 Bedroom</div>
        <div>1 Bathroom</div>
        <div>
          120 m<sup>2</sup>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="rounded-lg bg-gray-100 w-auto lg:w-1/2 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <CalendarIcon className="fill-gray-800 lg:scale-125" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-700">
              29 Mar - 30 Mar
            </div>
            <div className="text-gray-500 text-sm lg:text-lg">8-night stay</div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-100 w-auto lg:w-1/2 flex justify-start items-center gap-4 py-2 lg:py-3 px-3 lg:px-5">
          <div>
            <UserIcon className="fill-gray-800 scale-125 lg:scale-150" />
          </div>
          <div className="flex flex-col justify-center text-gray-700 text-base lg:text-xl">
            <div>1 Guest</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-base lg:text-2xl font-mi-sans-semi-bold text-gray-800">
          Extra Payments
        </div>
        {isMobile ? (
          <div className="mt-3 gap-y-5 flex flex-col">
            {map([1, 2, 3, 4, 5], (item, key) => {
              return (
                <Card className="rounded-xl shadow-base-blur-5">
                  <div className="flex items-center justify-start">
                    <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                      <Image
                        //todo: ev1.jpeg ve ev2.jpeg geçici olarak eklendi silinecekler.
                        src={
                          key % 2 === 0
                            ? "/images/ev1.jpeg"
                            : "/images/ev2.jpeg"
                        }
                        alt="home"
                        key={key}
                        fill={true}
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-2">
                      <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-800">
                        Transfer
                      </div>
                      <div className="text-grey-500 text-xs lg:text-sm line-clamp-3 my-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et
                      </div>
                      <div className="text-primary text-lg lg:text-2xl mt-auto">
                        9,803₺
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Slider
            sliderIdentifier="reservation-extra"
            sliderContainerClassName=""
            sliderWrapperClassName="py-2 px-1"
            slidesPerView={isMobile ? 1 : 2}
            spaceBetween={18}>
            {map([1, 2, 3, 4, 5], (item, key) => {
              return (
                <Card className="rounded-xl shadow-base-blur-5">
                  <div className="flex items-center justify-start">
                    <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                      <Image
                        //todo: ev1.jpeg ve ev2.jpeg geçici olarak eklendi silinecekler.
                        src={
                          key % 2 === 0
                            ? "/images/ev1.jpeg"
                            : "/images/ev2.jpeg"
                        }
                        alt="home"
                        key={key}
                        fill={true}
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-2">
                      <div className="text-base lg:text-xl font-mi-sans-semi-bold text-gray-800">
                        Transfer
                      </div>
                      <div className="text-grey-500 text-xs lg:text-sm line-clamp-3 my-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et
                      </div>
                      <div className="text-primary text-lg lg:text-2xl mt-auto">
                        9,803₺
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Slider>
        )}
      </div>
      <div>
        <div tabIndex={0} className="collapse collapse-arrow !visible">
          <input type="checkbox" />
          <div className="collapse-title text-sm lg:text-28 font-mi-sans-semi-bold text-primary-400 pl-0 after:right-2 after:top-6">
            Payment Details
          </div>
          <div className="collapse-content px-0">
            <div className="border-b border-b-gray-200 pb-5 grid grid-cols-1 gap-3">
              <div className="flex w-full justify-between items-center">
                <div className="text-gray-600 lg:text-xl text-xs">
                  9,803,75₺ x 11 nights
                </div>
                <div className="text-gray-700 lg:text-xl text-sm">27,987 ₺</div>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="text-gray-600 lg:text-xl text-xs">
                  25% Discount
                </div>
                <div className="text-gray-700 lg:text-xl text-sm">-4,987₺</div>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="text-gray-600 lg:text-xl text-xs">
                  Cleaning Fee
                </div>
                <div className="text-gray-700 lg:text-xl text-sm">400₺</div>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="text-gray-600 lg:text-xl text-xs">
                  Extra Payments
                </div>
                <div className="text-gray-700 lg:text-xl text-sm">100₺</div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mt-5">
              <div className="text-base lg:text-2xl">
                <span className="text-gray-800">Total Amount</span>
                <span className="text-gray-400">(Total 11 nights)</span>
              </div>
              <div className="text-primary text-base lg:text-28">
                <span className="font-mi-sans-semi-bold">16,889</span>
                <span>₺</span>
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
