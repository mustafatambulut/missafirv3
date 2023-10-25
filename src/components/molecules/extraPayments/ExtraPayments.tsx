import { isMobile } from "react-device-detect";
import Image from "next/image";
import { get, map } from "lodash";

import { IExtraPayments } from "@/components/molecules/extraPayments/types";

import Card from "@/components/atoms/card/Card";
import Slider from "@/components/molecules/slider/Slider";

const ExtraPayments = ({ reservation }: IExtraPayments) => {
  return (
    <div>
      <div className="text-base lg:text-2xl font-mi-sans-semi-bold text-gray-800">
        Extra Payments
      </div>
      {isMobile ? (
        <div className="mt-3 gap-y-5 flex flex-col">
          {map(get(reservation, "extraPayments"), (extraPayment, key) => {
            return (
              <Card key={key} className="rounded-xl shadow-base-blur-5">
                <div className="flex items-center justify-start">
                  {get(extraPayment, "image") && (
                    <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                      <Image
                        src={get(extraPayment, "image") || "/"}
                        alt="home"
                        key={key}
                        fill={true}
                        className="object-cover rounded-xl"
                      />
                    </div>
                  )}
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
          })}
        </div>
      ) : (
        <Slider
          sliderIdentifier="reservation-extra"
          sliderContainerClassName=""
          sliderWrapperClassName="py-2 px-1"
          desktopSlidesPerView={2}
          mobileSlidesPerView={1}
          desktopLargeSlidesPerView={3}
          desktopLargeSpaceBetween={20}
          desktopSpaceBetween={18}
          mobileSpaceBetween={18}>
          {map(get(reservation, "extraPayments"), (extraPayment, key) => {
            return (
              <Card key={key} className="rounded-xl shadow-base-blur-5">
                <div className="flex items-center justify-start">
                  {get(extraPayment, "image") && (
                    <div className="w-[160px] h-[126px] lg:h-[151px] relative">
                      <Image
                        src={get(extraPayment, "image") || "/"}
                        alt="home"
                        key={key}
                        fill={true}
                        className="object-cover rounded-xl"
                      />
                    </div>
                  )}
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
          })}
        </Slider>
      )}
    </div>
  );
};

export default ExtraPayments;
