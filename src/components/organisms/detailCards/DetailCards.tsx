"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { first, get, map, size } from "lodash";

import { getCurrentLang } from "@/utils/helper";
import { getLandingListingTabDetails } from "@/service/api";
import { IDetailCards } from "@/components/organisms/detailCards/types";

import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import CustomNavigation from "@/components/atoms/customNavigation/CustomNavigation";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";

import RightArrow from "../../../../public/images/chevron_right.svg";

const HomeListingTabsSkeleton = dynamic(
  () =>
    import(
      "@/components/molecules/skeletons/homeListingTabsSkeleton/HomeListingTabsSkeleton"
    ),
  {
    ssr: false
  }
);

const HomeListingBodySkeleton = dynamic(
  () =>
    import(
      "@/components/molecules/skeletons/homeListingBodySkeleton/HomeListingBodySkeleton"
    ),
  {
    ssr: false
  }
);

const DetailCards = ({ lang, tabs, header, className = "" }: IDetailCards) => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listingTabDetails, setListingTabDetails] = useState([]);
  const tabClass = (id) => {
    return classNames(
      "tab border-b-none text-grey-600 text-base lg:text-xl lg:pb-2 px-0 h-full w-full flex flex-col items-center",
      {
        "tab-active text-primary": id === activeTab,
        "border-b-transparent": id !== activeTab
      }
    );
  };

  const fetchDetails = async (activeTab) => {
    setIsLoading(true);
    const { data } = await getLandingListingTabDetails(activeTab);
    !!get(data, "data.items") && setIsLoading(false);
    setListingTabDetails(get(data, "data.items"));
  };

  useEffect(() => {
    activeTab && fetchDetails(activeTab);
  }, [activeTab]);

  useEffect(() => {
    !!size(tabs) && setActiveTab(get(first(tabs), "id"));
  }, [tabs]);

  return (
    <Section
      className={`px-2 lg:px-8 mt-14 ${className}`}
      title={get(header, "title")}
      description={get(header, "description")}>
      <div className="tab-container w-full">
        <div className="tabs w-full flex shadow-bold-blur-20 lg:shadow-bold-blur-20-dark h-28 rounded-2xl">
          <Loading isLoading={!size(tabs)} loader={<HomeListingTabsSkeleton />}>
            <Slider
              sliderIdentifier="listing-details-tabs"
              desktopSlidesPerView={7}
              mobileSlidesPerView={3}
              desktopLargeSlidesPerView={7}
              desktopLargeSpaceBetween={0}
              desktopSpaceBetween={0}
              mobileSpaceBetween={0}
              sliderContainerClassName="h-full w-full px-5 lg:px-10"
              sliderWrapperClassName="h-full"
              customNavigation={
                <CustomNavigation sliderIdentifier="listing-details-tabs" />
              }>
              {map(tabs, (tab, key) => (
                <div
                  key={key}
                  className={tabClass(get(tab, "id"))}
                  onClick={() => setActiveTab(get(tab, "id"))}>
                  <Typography element="h6" variant="h6">
                    {get(tab, "name")}
                  </Typography>
                  {get(tab, "id") === activeTab && (
                    <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-2"></div>
                  )}
                </div>
              ))}
            </Slider>
          </Loading>
        </div>
        <Loading isLoading={isLoading} loader={<HomeListingBodySkeleton />}>
          {!!size(listingTabDetails) && (
            <div className="tab-content mt-4">
              {isMobile ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:overflow-x-hidden gap-4 p-1">
                  {map(listingTabDetails, (listing, key) => (
                    <ListingListItem key={key} lang={lang} listing={listing} />
                  ))}
                </div>
              ) : (
                <Slider
                  sliderIdentifier="listing-details-content"
                  sliderWrapperClassName="py-1"
                  desktopSlidesPerView={4}
                  mobileSlidesPerView={1}
                  desktopLargeSlidesPerView={5}
                  desktopLargeSpaceBetween={10}
                  desktopSpaceBetween={10}
                  mobileSpaceBetween={10}>
                  {map(listingTabDetails, (listing, key) => (
                    <ListingListItem key={key} lang={lang} listing={listing} />
                  ))}
                </Slider>
              )}
            </div>
          )}
        </Loading>
      </div>
      {!!size(listingTabDetails) && (
        <div className="w-full flex justify-center items-center mt-10">
          <Button
            variant="btn-primary"
            link={`/${getCurrentLang()}/list`}
            className="bg-primary-50 text-primary border-primary-25 hover:bg-primary hover:border-primary group">
            <span className="group-hover:text-white text-xl font-mi-sans-semi-bold">
              {t("see_all_properties")}
            </span>
            <RightArrow className="scale-50 fill-primary group-hover:fill-white" />
          </Button>
        </div>
      )}
    </Section>
  );
};

export default DetailCards;
