import Card from "@/components/atoms/card/Card";
import Link from "next/link";
import { get, map } from "lodash";
import Image from "next/image";
import Draggable from "react-draggable";

// todo:badge verisi gelince düzenlenecek
//import Badge from "@/components/atoms/badge/Badge";
import ReservationItemContent from "@/components/atoms/reservationItemContent/ReservationItemContent";
import Slider from "@/components/molecules/slider/Slider";

import HeartIcon from "../../../../public/images/wishlist_heart_outline.svg";
import HeartIconFilled from "../../../../public/images/wishlist_heart_filled.svg";
import { IReservationItemDetail } from "@/components/molecules/reservationItemDetail/types";

const ReservationItemDetail = ({
  left,
  itemRef,
  actionRef,
  handleStop,
  handleDrag,
  reservation,
  isInWishlist,
  isMobileDevice,
  handleClickWishlist
}: IReservationItemDetail) => {
  const renderWishlistHeart = () => {
    return isInWishlist ? (
      <HeartIconFilled className="scale-75" />
    ) : (
      <HeartIcon className="scale-75" />
    );
  };

  return (
    <>
      <div
        className={`absolute right-0 rounded-r-xl h-full p-2 pr-4 flex items-center justify-center text-white w-1/3 font-mi-sans-semi-bold text-base gap-2 flex-col`}
        ref={actionRef}>
        {get(reservation, "status.title")}
      </div>
      <Draggable
        nodeRef={itemRef}
        defaultClassName={`${isMobileDevice ? "pr-2" : ""}`}
        disabled={!isMobileDevice}
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
          <Link href={`/profile/reservations/${get(reservation, "uuid")}`}>
            <Card>
              <div className="flex gap-3 lg:gap-6 shadow-base-blur-20 rounded-l-xl lg:rounded-xl relative bg-white">
                <div className="w-40 lg:w-72 h-48 lg:h-64 relative">
                  <Slider
                    sliderIdentifier="reservations-image"
                    slidesPerView={1}
                    spaceBetween={0}
                    withPagination={true}>
                    {map(get(reservation, "listing.pictures"), (image, key) => (
                      <div key={key} className="lg:w-72 h-48 lg:h-64">
                        <Image
                          key={key}
                          src={get(image, "path")}
                          alt="reservation"
                          fill={true}
                          className="rounded-tl-xl rounded-bl-xl object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                  {/*todo: badge verisi gelince düzelecek*/}
                  {/*<div className="absolute left-2 top-2 grid grid-cols-1 gap-y-2 z-10">*/}
                  {/*  {map(get(reservation, "badges"), (badge, key) => (*/}
                  {/*    <Badge*/}
                  {/*      key={key}*/}
                  {/*      color={get(badge, "color")}*/}
                  {/*      className={`bg-white lg:text-lg font-mi-sans-semi-bold lg:py-4 lg:px-4 py-2 px-1 rounded-lg text-xs`}>*/}
                  {/*      {get(badge, "label")}*/}
                  {/*    </Badge>*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                  <div
                    className="absolute right-2 top-1 z-10"
                    data-wishlist={true}
                    onClick={handleClickWishlist}>
                    {renderWishlistHeart()}
                  </div>
                </div>
                <ReservationItemContent reservation={reservation} />
              </div>
            </Card>
          </Link>
        </div>
      </Draggable>
    </>
  );
};

export default ReservationItemDetail;
