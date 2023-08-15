"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { get, has, includes } from "lodash";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

import { IReservationItem } from "@/components/molecules/reservationItem/types";

import ReservationItemDetail from "@/components/molecules/reservationItemDetail/ReservationItemDetail";

const ReservationItem = ({ reservation }: IReservationItem) => {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [left, setLeft] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const itemRef = useRef(null);
  const actionRef = useRef(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) {
      let isWish = false;
      let parent = null;
      const tagName = e.target.tagName;

      if (tagName === "svg") {
        parent = e.target.parentNode;
      } else if (tagName === "path") {
        parent = e.target.parentNode.parentNode.parentNode;
      }

      isWish = has(get(parent, "dataset"), "wishlist");
      isWish
        ? handleClickWishlist(e)
        : router.push(`/profile/reservations/${get(reservation, "id")}`);
    }
  };

  const reservationWrapperClass = classNames(
    "relative rounded-xl cursor-pointer",
    {
      "bg-gradient-to-l from-warning-yellow from-40% to-white":
        get(reservation, "status.type") === "pending",
      "bg-gradient-to-l from-success-green from-40% to-white":
        get(reservation, "status.type") === "confirmed",
      "bg-gradient-to-l from-error-red from-40% to-white":
        get(reservation, "status.type") === "cancelled"
    }
  );

  const checkIsNotDraggable = (e) => {
    const parent = e.target.offsetParent;
    const tagName = e.target.tagName;
    return includes(parent.className, "swiper-slide") && tagName === "IMG";
  };

  const handleStop = () => {
    if (percent < 30) return setLeft(0);

    const w = get(actionRef, "current.offsetWidth");
    const leftWithAction = left > 0 ? w : w * -1;
    leftWithAction && setLeft(leftWithAction);
  };

  const handleDrag = (e:any, data:any) => {
    if (percent === 0 && checkIsNotDraggable(e)) return false;
    const w = get(itemRef, "current.offsetWidth");
    const x = get(data, "x") < 0 ? get(data, "x") * -1 : get(data, "x");
    const p = (x / w) * 100;

    setPercent(p);
    setLeft(data.x);
  };

  const handleClickWishlist = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
  };

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <div
      className={reservationWrapperClass}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}>
      <ReservationItemDetail
        reservation={reservation}
        isInWishlist={isInWishlist}
        handleClickWishlist={handleClickWishlist}
        itemRef={itemRef}
        left={left}
        actionRef={actionRef}
        handleDrag={handleDrag}
        isMobileDevice={isMobileDevice}
        handleStop={handleStop}
      />
    </div>
  );
};

export default ReservationItem;
