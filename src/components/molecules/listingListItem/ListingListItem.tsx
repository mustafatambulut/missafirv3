"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";

import { IListing } from "@/components/molecules/listingListItem/types";

import Card from "@/components/atoms/card/Card";
import Badge from "@/components/atoms/badge/Badge";
import Slider from "@/components/molecules/slider/Slider";

import HeartOutline from "../../../../public/images/heart_outline.svg";
import HeartFilled from "../../../../public/images/heart_filled_primary.svg";

const ListingListItem = ({ listing, filterData }: IListing) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked((v) => !v);
  };

  const outlineFilledHeart = () => {
    return isLiked ? <HeartFilled /> : <HeartOutline />;
  };

  const customPagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return `<span class="${className}"></span>`;
    }
  };

  const getPrice = () => {
    const listingPrice = get(listing.price, get(filterData, "priceType"));
    return (
      <div className="flex flex-col items-start">
        {get(listingPrice, "oldAmount") && (
          <div className="text-gray-300 text-sm lg:text-lg line-through">
            {get(listingPrice, "oldAmount")}
          </div>
        )}
        <div>
          <span className="text-22 lg:text-28 text-primary font-mi-sans-semi-bold mr-2 lg:mr-5">
            {get(listingPrice, "amount")}
          </span>
          <span className="text-gray-600 lg:text-gray-500 text-sm">
            /{get(listingPrice, "type")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Link href={`listing/${get(listing, "id")}`} className="cursor-pointer">
      <Card>
        <div className="relative">
          <Slider
            spaceBetween={0}
            slidesPerView={1}
            withPagination={true}
            sliderIdentifier="reservations-image"
            customPagination={customPagination}>
            {map(get(listing, "images"), (image, key) => (
              <div key={key} className="lg:w-72 h-52 lg:h-60">
                <Image
                  key={key}
                  fill={true}
                  alt="reservation"
                  src={get(image, "src")}
                  className="rounded-xl object-cover"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute left-3 top-2 grid grid-cols-1 gap-y-2 z-10">
            {map(get(listing, "badges"), (badge, key) => (
              <Badge
                key={key}
                color={get(badge, "color")}
                className="bg-white text-base lg:text-lg font-mi-sans-semi-bold p-4 rounded-lg">
                {get(badge, "label")}
              </Badge>
            ))}
          </div>
          <div
            onClick={handleLike}
            className="absolute right-3 top-3 z-10 flex justify-center items-center cursor-pointer">
            {outlineFilledHeart()}
          </div>
        </div>
        <div className="grid gap-y-1">
          <div className="text-sm lg:text-xl text-gray-600">
            {get(listing, "location")}
          </div>
          <div className="text-lg lg:text-xl text-gray-800 font-mi-sans-semi-bold">
            {get(listing, "title")}
          </div>
          <div className="flex gap-3">
            {map(get(listing, "essentials"), (essential, key) => (
              <div
                key={key}
                className="text-base lg:tect-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                {essential}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          {getPrice()}
          <div className="bg-primary-opacity py-2 px-4 rounded-xl text-primary flex flex-col items-center gap-y-1">
            <span className="text-xs">Available on</span>
            <span className="text-base lg:text-22 font-mi-sans-semi-bold">
              {get(listing, "available")}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ListingListItem;
