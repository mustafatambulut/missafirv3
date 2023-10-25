"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import get from "lodash/get";
import has from "lodash/has";
import map from "lodash/map";
import lowerCase from "lodash/lowerCase";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

import useFilter from "@/app/hooks/useFilter";
import { useSearchParams } from "next/navigation";
import { addSuffix, queryStringForClientSide } from "@/utils/helper";
import { IListing } from "@/components/molecules/listingListItem/types";

import Typography from "@/components/atoms/typography/Typography";
import Card from "@/components/organisms/card/Card";

import ChevronLeft from "../../../../public/images/chevron_left.svg";
import CloseIcon from "../../../../public/images/variants/close.svg";
import ChevronRight from "../../../../public/images/chevron_right.svg";

const ListingListItem = ({ lang, listing }: IListing) => {
  const t = useTranslations();
  const suffix = addSuffix(lang);
  const { replaceValue } = useFilter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);
  const sliderIdentifier = uuidv4();

  const toggleBreakdown = (e) => {
    e.preventDefault();
    setShowBreakdown((v) => !v);
  };

  const renderBreakdown = (breakdown): ReactNode => (
    <div className="flex flex-col gap-y-3 bg-white w-full p-5 shadow-base-blur-20 rounded-xl">
      <div className="flex justify-between items-center mb-3">
        <div className="text-lg">{t("price_breakdown")}</div>
        <CloseIcon className="fill-gray-800" onClick={toggleBreakdown} />
      </div>
      {map(breakdown, ({ label, value, extra }, key) => {
        return extra ? (
          <div key={key} className="flex flex-col ">
            <div className="flex justify-between">
              <Typography variant="p4" element="span" className="text-base">
                {label}
              </Typography>
              <Typography variant="p4" element="span" className="text-gray-700">
                {value}
              </Typography>
            </div>
            <hr />
          </div>
        ) : (
          <div key={key} className="flex justify-between">
            <Typography variant="p3" element="span">
              {label}
            </Typography>
            <Typography variant="p3" element="span" className="text-gray-700">
              {value}
            </Typography>
          </div>
        );
      })}
    </div>
  );

  const renderPrice = (price) => {
    return (
      <div className="flex flex-col items-start justify-end leading-7 h-[4.3rem]">
        <div>
          <div className="flex gap-x-2 items-center">
            {get(price, "discount_percentage") && (
              <Typography
                variant="p3"
                element="div"
                className="rounded bg-green-50 text-green-600 p-1">
                {get(price, "discount_percentage")}
              </Typography>
            )}
            {get(price, "original_average_daily_price") && (
              <Typography
                variant="p3"
                element="div"
                className="line-through text-gray-400">
                {get(price, "original_average_daily_price")}
              </Typography>
            )}
          </div>

          <div className="flex items-end gap-x-2">
            {get(price, "average_daily_price") && (
              <div className="flex gap-x-1 items-end">
                <Typography
                  variant="p1"
                  element="span"
                  className="text-primary">
                  {get(price, "average_daily_price") &&
                    get(price, "average_daily_price")}
                </Typography>
                <Typography
                  variant="p5"
                  element="span"
                  className="text-gray-400">
                  /{lowerCase(t("nightly"))}
                </Typography>
              </div>
            )}
            {get(price, "final") && !get(listing, "available_on") && (
              <div
                className="text-primary underline cursor-pointer"
                onClick={toggleBreakdown}>
                <div>
                  {get(price, "final")} {lowerCase(t("total"))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TitleComponent = () => {
    return (
      <Typography
        variant="h6"
        element="span"
        className="text-gray-800 font-mi-sans-semi-bold h-14 line-clamp-2 order-2 lg:order-1">
        {get(listing, "title")}
      </Typography>
    );
  };

  const CustomNavigation = () => {
    return (
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`swiper-button-prev after:hidden listing-images-${sliderIdentifier} scale-50 left-0`}>
          <ChevronLeft />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`swiper-button-next after:hidden listing-images-${sliderIdentifier} scale-50 right-0`}>
          <ChevronRight />
        </div>
      </>
    );
  };

  //todo: favoriye ekleme işlemi gelecek

  return (
    <Link
      href={`/${get(listing, "slug")}-${suffix}${replaceValue(
        queryStringForClientSide(searchParams),
        "?"
      )}`}>
      <Card
        setIsFav={setIsFav}
        className="rounded-20 shadow-base-blur-5 relative"
        titleClass="px-4 pt-4 mt-0"
        bodyClass="px-4 pt-0 pb-4"
        title={<TitleComponent />}
        sliderOptions={{
          mobileSlidesPerView: 1,
          desktopSlidesPerView: 1,
          desktopLargeSlidesPerView: 1,
          desktopLargeSpaceBetween: 0,
          mobileSpaceBetween: 0,
          desktopSpaceBetween: 0,
          withPagination: true,
          withNavigation: false,
          customNavigation: <CustomNavigation />,
          sliderIdentifier: `listing-images-${sliderIdentifier}`,
          sliderWrapperClassName: "rounded-t-20 w-full h-64 2xl:h-80"
        }}
        badgeClass="bg-primary-100 text-primary"
        images={map(get(listing, "pictures"), "path")}>
        {get(listing, "price.breakdown") && (
          <>
            {showBreakdown && (
              <div
                className="absolute top-[50%] translate-y-[-50%] left-0 w-full z-10 px-1"
                onClick={(e) => e.preventDefault()}>
                {renderBreakdown(get(listing, "price.breakdown"))}
              </div>
            )}
          </>
        )}
        <div className="flex flex-col h-full gap-y-3">
          <div className="flex flex-col">
            <div className="text-sm lg:text-lg text-gray-500 flex gap-x-2 order-1 lg:order-2">
              {get(listing, "city") && (
                <Typography variant="p3" element="span">
                  {get(listing, "city.name")}
                  {get(listing, "district") && ","}
                </Typography>
              )}
              {get(listing, "district") && (
                <Typography variant="p3" element="span">
                  {get(listing, "district.name")}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {get(listing, "rooms_bedrooms_count") ? (
              <div className="flex gap-x-1 lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <Typography variant="p3" element="span">
                  {get(listing, "rooms_bedrooms_count")}
                </Typography>
                <Typography variant="p3" element="span">
                  {t("beds")}
                </Typography>
              </div>
            ) : null}
            {get(listing, "rooms_bathrooms_count") ? (
              <div className="flex gap-x-1 lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <Typography variant="p3" element="span">
                  {get(listing, "rooms_bathrooms_count")}
                </Typography>
                <Typography variant="p3" element="span">
                  {t("bathrooms")}
                </Typography>
              </div>
            ) : null}
            {get(listing, "space") ? (
              <div className="flex gap-x-1 lg:font-mi-sans-semi-bold text-gray-800 lg:text-gray-500">
                <Typography variant="p3" element="span">
                  {get(listing, "space")}
                </Typography>
                <Typography variant="p3" element="span">
                  {t("m2")}
                </Typography>
              </div>
            ) : null}
          </div>
          <div className="flex justify-between items-end h-full">
            {has(listing, "price") && renderPrice(get(listing, "price"))}
            {get(listing, "available_on") && (
              <div className="ml-auto bg-primary-opacity p-2 rounded-xl text-primary flex flex-col items-center gap-y-1">
                <Typography variant="p6" element="span">
                  {t("available_on")}
                </Typography>
                <Typography
                  variant="p2"
                  element="span"
                  className="font-mi-sans-semi-bold">
                  {get(listing, "available_on")}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ListingListItem;
