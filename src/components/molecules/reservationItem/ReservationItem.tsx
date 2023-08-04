"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";
import classNames from "classnames";
import Draggable from "react-draggable";
import { isMobile } from "react-device-detect";

import { IReservationItem } from "@/components/molecules/reservationItem/types";

import Card from "@/components/atoms/card/Card";
import Badge from "@/components/atoms/badge/Badge";
import Slider from "@/components/molecules/slider/Slider";

const ReservationItem = ({ reservation }: IReservationItem) => {
  const [percent, setPercent] = useState(0);
  const [left, setLeft] = useState(0);

  const itemRef = useRef();
  const actionRef = useRef();

  const reservationWrapperClass = classNames("relative rounded-xl", {
    "bg-gradient-to-l from-warning-yellow from-40% to-white":
      get(reservation, "status.type") === "pending",
    "bg-gradient-to-l from-success-green from-40% to-white":
      get(reservation, "status.type") === "confirmed",
    "bg-gradient-to-l from-error-red from-40% to-white":
      get(reservation, "status.type") === "cancelled"
  });

  const statusSectionClass = classNames({
    "bg-warning-yellow": get(reservation, "status.type") === "pending",
    "bg-success-green": get(reservation, "status.type") === "confirmed",
    "bg-error-red": get(reservation, "status.type") === "cancelled"
  });

  const handleStop = () => {
    if (percent > 30) {
      const w = actionRef.current.offsetWidth;
      const leftWithAction = left > 0 ? w : w * -1;
      setLeft(leftWithAction);
    } else {
      setLeft(0);
    }
  };

  const handleDrag = (e, data) => {
    const w = itemRef.current.offsetWidth;
    const x = data.x < 0 ? data.x * -1 : data.x;
    const p = (x / w) * 100;

    setPercent(p);
    setLeft(data.x);
  };

  const customPagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return `<span class="${className}"></span>`;
    }
  };
  return (
    <Link href="#">
      <div className={reservationWrapperClass}>
        <div
          className={`absolute right-0 rounded-r-xl h-full p-2 pr-4 flex items-center justify-center text-white w-1/3 font-mi-sans-semi-bold text-base gap-2 flex-col`}
          ref={actionRef}>
          {get(reservation, "status.icon")}
          {get(reservation, "status.label")}
        </div>
        <Draggable
          defaultClassName={`${isMobile && "pr-2"}`}
          disabled={!isMobile}
          bounds={{ right: 0 }}
          axis="x"
          handle={`.item`}
          defaultPosition={{ x: 0, y: 0 }}
          position={{ x: left, y: 0 }}
          onDrag={handleDrag}
          onStop={handleStop}>
          <div
            ref={itemRef}
            className="item"
            style={{ transform: `translate3d(${left}px, 0, 0px)` }}
            // onClick={handleClick}
          >
            <Card>
              <div className="flex gap-3 lg:gap-6 shadow-[0px_1px_20px_0px_#00000014] rounded-l-xl lg:rounded-xl relative bg-white">
                <div className="w-40 lg:w-72 h-48 lg:h-64 relative">
                  <Slider
                    sliderIdentifier="reservations-image"
                    slidesPerView={1}
                    spaceBetween={0}
                    customPagination={customPagination}
                    withPagination={true}>
                    {map(get(reservation, "images"), (image, key) => (
                      <div key={key} className="lg:w-72 h-48 lg:h-64">
                        <Image
                          key={key}
                          src={image.src || ""}
                          alt="reservation"
                          fill={true}
                          className="rounded-tl-xl rounded-bl-xl object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                  <div className="absolute left-2 top-2 grid grid-cols-1 gap-y-2 z-10">
                    {map(reservation.badges, (badge, key) => (
                      <Badge
                        key={key}
                        color={get(badge, "color")}
                        className={`bg-white text-lg font-mi-sans-semi-bold p-4 rounded-lg`}>
                        {get(badge, "label")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1 lg:gap-y-3 justify-center lg:pr-4">
                  <div className="text-gray-700 text-sm lg:text-lg">
                    {get(reservation, "code")}
                  </div>
                  <div className="text-gray-800 text-base lg:text-2xl font-mi-sans-semi-bold line-clamp-2">
                    {get(reservation, "title")}
                  </div>
                  <div className="text-gray-500 text-sm lg:text-lg">
                    {get(reservation, "location")}
                  </div>
                  <div className="flex text-gray-600 text-sm lg:text-22 gap-x-4 items-center">
                    <div>{get(reservation, "dates")}</div>
                    <div>{get(reservation, "guests")}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="listing-item-content-price flex items-end">
                      <span className="text-primary text-lg lg:text-28 font-mi-sans-semi-bold">
                        {get(reservation, "price.amount")}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-500 ml-2">
                        / {get(reservation, "price.type")}
                      </span>
                    </div>
                    <div
                      className={`${statusSectionClass} rounded text-white text-xl font-mi-sans-semi-bold hidden lg:flex items-center justify-center px-1 lg:py-2 lg:px-3`}>
                      {get(reservation, "status.label")}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Draggable>
      </div>
    </Link>
  );
};

export default ReservationItem;
