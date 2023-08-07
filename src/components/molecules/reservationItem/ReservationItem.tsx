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
import ReservationItemContent from "@/components/atoms/reservationItemContent/ReservationItemContent";

const ReservationItem = ({ reservation }: IReservationItem) => {
  const [percent, setPercent] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

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

  const handleStop = () => {
    if (percent < 30) return setLeft(0);

    const w = get(actionRef, "current.offsetWidth");
    const leftWithAction = left > 0 ? w : w * -1;
    setLeft(leftWithAction);
  };

  const handleDrag = (e, data) => {
    const w = get(itemRef, "current.offsetWidth");
    const x = get(data, "x") < 0 ? get(data, "x") * -1 : get(data, "x");
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
          handle=".item"
          defaultPosition={{ x: 0, y: 0 }}
          position={{ x: left, y: 0 }}
          onDrag={handleDrag}
          onStop={handleStop}>
          <div
            ref={itemRef}
            className="item"
            style={{ transform: `translate3d(${left}px, 0, 0)` }}>
            <Card>
              <div className="flex gap-3 lg:gap-6 shadow-base-blur-20 rounded-l-xl lg:rounded-xl relative bg-white">
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
                          src={get(image, "src")}
                          alt="reservation"
                          fill={true}
                          className="rounded-tl-xl rounded-bl-xl object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                  <div className="absolute left-2 top-2 grid grid-cols-1 gap-y-2 z-10">
                    {map(get(reservation, "badges"), (badge, key) => (
                      <Badge
                        key={key}
                        color={get(badge, "color")}
                        className={`bg-white text-lg font-mi-sans-semi-bold p-4 rounded-lg`}>
                        {get(badge, "label")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ReservationItemContent reservation={reservation} />
              </div>
            </Card>
          </div>
        </Draggable>
      </div>
    </Link>
  );
};

export default ReservationItem;
