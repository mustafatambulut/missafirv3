"use client";
import {useEffect, useState} from "react";
import Link from "next/link";
import { get, has, map } from "lodash";

import { IListing } from "@/components/molecules/listingListItem/types";

import Card from "@/components/organisms/card/Card";
/*todo: badge verisi gelince açılacak*/
//import Badge from "@/components/atoms/badge/Badge";

const ListingListItem = ({ listing }: IListing) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  const renderPrice = (price) => {
    return (
      <div className="flex flex-col items-start justify-end leading-7 h-16">
        {get(price, "total_discount_price") && (
          <div className="text-gray-300 text-sm lg:text-lg line-through">
            {get(price, "listing")}
          </div>
        )}
        <div>
          <span className="text-22 lg:text-28 text-primary font-mi-sans-semi-bold mr-2 lg:mr-5">
            {get(price, "final")}
          </span>
          <span className="text-gray-600 lg:text-gray-500 text-sm">
            {/*todo: price type gelecek*/}
            {/*/{get(listingPrice, "type")}*/}
            /nightly
          </span>
        </div>
      </div>
    );
  };

  const TitleComponent = () => {
    return (
      <div className="text-lg lg:text-xl text-gray-800 font-mi-sans-semi-bold h-14 line-clamp-2 order-2 lg:order-1">
        {get(listing, "title")}
      </div>
    );
  };

  useEffect(() => {
      //todo: favoriye ekleme işlemi gelecek
      console.log("isFav", isFav)
  },[isFav])


  return (
    <Link href={`/listing/${get(listing, "uuid")}`}>
      <Card
        setIsFav={setIsFav}
        className="rounded-2xl shadow-base-blur-5"
        titleClass="px-4 pt-4 mt-0"
        bodyClass="px-4 pt-0 pb-4"
        title={<TitleComponent />}
        sliderOptions={{
          slidesPerView: 1,
          spaceBetween: 0,
          withPagination: true,
          sliderIdentifier: "message-detail-images",
          sliderWrapperClassName: "rounded-t-lg w-full h-64 2xl:h-80"
        }}
        badgeClass="bg-primary-100 text-primary"
        images={map(get(listing, "pictures"), (picture) => picture.path)}>
        <div className="flex flex-col h-full gap-y-3">
          <div className="flex flex-col">
            <div className="text-sm lg:text-lg text-gray-500 flex gap-x-2 order-1 lg:order-2">
              {get(listing, "city") && (
                <span>
                  {get(listing, "city.name")}
                  {get(listing, "district") && ","}
                </span>
              )}
              {get(listing, "district") && (
                <span>{get(listing, "district.name")}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {get(listing, "rooms_bedrooms_count") ? (
              <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <span>{get(listing, "rooms_bedrooms_count")}</span>
                <span>beds</span>
              </div>
            ) : null}
            {get(listing, "rooms_bathrooms_count") ? (
              <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <span>{get(listing, "rooms_bathrooms_count")}</span>
                <span>bathrooms</span>
              </div>
            ) : null}
            {get(listing, "space") ? (
              <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <span>{get(listing, "space")}</span>
                <span>m2</span>
              </div>
            ) : null}
          </div>
          <div className="flex justify-between items-end h-full">
            {has(listing, "price") && renderPrice(get(listing, "price"))}
            {get(listing, "available_on") && (
              <div className="ml-auto bg-primary-opacity py-2 px-4 rounded-xl text-primary flex flex-col items-center gap-y-1">
                <span className="text-xs">Available on</span>
                <span className="text-base lg:text-22 font-mi-sans-semi-bold">
                  {get(listing, "available_on")}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/*<Card*/}
      {/*  cardBodyClassName="h-full gap-0"*/}
      {/*  className="cursor-pointer shadow-base-blur-5 rounded-2xl">*/}
      {/*  <div className="relative">*/}
      {/*    <div*/}
      {/*      onClick={handleLike}*/}
      {/*      className="absolute right-3 top-3 z-10 flex justify-center items-center cursor-pointer">*/}
      {/*      {outlineFilledHeart()}*/}
      {/*    </div>*/}
      {/*    <Slider*/}
      {/*      spaceBetween={0}*/}
      {/*      slidesPerView={1}*/}
      {/*      sliderIdentifier="reservations-image"*/}
      {/*      withPagination={true}*/}
      {/*      customPagination={true}>*/}
      {/*      {map(get(listing, "pictures"), (image) => (*/}
      {/*        <div key={get(image, "id")} className="lg:w-72 h-52 lg:h-60">*/}
      {/*          <Image*/}
      {/*            fill={true}*/}
      {/*            alt="reservation"*/}
      {/*            src={get(image, "path")}*/}
      {/*            className="rounded-t-xl object-cover"*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </Slider>*/}
      {/*    /!*todo: badge verisi gelince düzenlenecek*!/*/}
      {/*    /!*<div className="absolute left-3 top-2 grid grid-cols-1 gap-y-2 z-10">*!/*/}
      {/*    /!*  {map(get(listing, "badges"), (badge, key) => (*!/*/}
      {/*    /!*    <Badge*!/*/}
      {/*    /!*      key={key}*!/*/}
      {/*    /!*      color={get(badge, "color")}*!/*/}
      {/*    /!*      className="bg-white text-base lg:text-lg font-mi-sans-semi-bold p-4 rounded-lg">*!/*/}
      {/*    /!*      {get(badge, "label")}*!/*/}
      {/*    /!*    </Badge>*!/*/}
      {/*    /!*  ))}*!/*/}
      {/*    /!*</div>*!/*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col h-full p-4 gap-y-3">*/}
      {/*    <div className="flex flex-col">*/}
      {/*      <div className="text-lg lg:text-xl text-gray-800 font-mi-sans-semi-bold h-14 line-clamp-2 order-2 lg:order-1">*/}
      {/*        {get(listing, "title")}*/}
      {/*      </div>*/}
      {/*      <div className="text-sm lg:text-xl text-gray-600 flex gap-x-2 order-1 lg:order-2">*/}
      {/*        {get(listing, "city") && (*/}
      {/*          <span>*/}
      {/*            {get(listing, "city.name")}*/}
      {/*            {get(listing, "district") && ","}*/}
      {/*          </span>*/}
      {/*        )}*/}
      {/*        {get(listing, "district") && (*/}
      {/*          <span>{get(listing, "district.name")}</span>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="flex gap-4">*/}
      {/*      {get(listing, "rooms_bedrooms_count") ? (*/}
      {/*        <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">*/}
      {/*          <span>{get(listing, "rooms_bedrooms_count")}</span>*/}
      {/*          <span>beds</span>*/}
      {/*        </div>*/}
      {/*      ) : null}*/}
      {/*      {get(listing, "rooms_bathrooms_count") ? (*/}
      {/*        <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">*/}
      {/*          <span>{get(listing, "rooms_bathrooms_count")}</span>*/}
      {/*          <span>bathrooms</span>*/}
      {/*        </div>*/}
      {/*      ) : null}*/}
      {/*      {get(listing, "space") ? (*/}
      {/*        <div className="flex gap-x-1 text-base lg:text-lg lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">*/}
      {/*          <span>{get(listing, "space")}</span>*/}
      {/*          <span>m2</span>*/}
      {/*        </div>*/}
      {/*      ) : null}*/}
      {/*    </div>*/}
      {/*    <div className="flex justify-between items-end h-full">*/}
      {/*      {has(listing, "price") && renderPrice(get(listing, "price"))}*/}
      {/*      {get(listing, "available_on") && (*/}
      {/*        <div className="ml-auto bg-primary-opacity py-2 px-4 rounded-xl text-primary flex flex-col items-center gap-y-1">*/}
      {/*          <span className="text-xs">Available on</span>*/}
      {/*          <span className="text-base lg:text-22 font-mi-sans-semi-bold">*/}
      {/*            {get(listing, "available_on")}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Card>*/}
    </Link>
  );
};

export default ListingListItem;
