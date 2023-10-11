"use client";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { first, get, map, size } from "lodash";

import "./ListingDetails.css";

import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";

import PreviousIcon from "../../../../public/images/chevron_left.svg";
import {
  getLandingListingTabs,
  getLandingListingTabDetails
} from "@/service/api";
import Button from "@/components/atoms/button/Button";
import RightArrow from "../../../../public/images/chevron_right.svg";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import { useTranslations } from "next-intl";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";
import dynamic from "next/dynamic";

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
const CustomNavigation = () => {
  return (
    <>
      <div className="listing-details swiper-button-prev rounded-full shadow after:hidden hidden lg:flex h-20 w-10 z-10 top-10 right-auto left-5 bg-primary-100 border-primary-100">
        <PreviousIcon className="fill-primary scale-50" />
      </div>
      <div className="listing-details swiper-button-next rounded-full shadow after:hidden hidden lg:flex h-20 w-10 z-10 top-10 left-auto right-5 bg-primary-100 border-primary-100">
        <RightArrow className="fill-primary scale-50" />
      </div>
    </>
  );
};

const ListingDetails = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [listingTabs, setListingTabs] = useState([]);
  const [listingTabDetails, setListingTabDetails] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchDetails = async (activeTab) => {
      setListingTabDetails([]);
      const { data } = await getLandingListingTabDetails(activeTab);
      setListingTabDetails(get(data, "data.items"));
    };
    activeTab && fetchDetails(activeTab);
  }, [activeTab]);

  useEffect(() => {
    size(listingTabs) > 0 && setActiveTab(get(first(listingTabs), "id"));
  }, [listingTabs]);

  useEffect(() => {
    const fetchListingTabs = async () => {
      const { data } = await getLandingListingTabs();
      setListingTabs(get(data, "data"));
    };
    fetchListingTabs();
  }, []);

  const listingsData = {
    header: {
      title: t("listing_data_title"),
      description: t("listing_data_description")
    }
  };

  return (
    <>
      {listingTabs && (
        <Section
          className="px-2 lg:px-8 mt-14"
          title={get(listingsData, "header.title")}
          description={get(listingsData, "header.description")}>
          <div className="tab-container w-full">
            <div className="tabs w-full flex shadow-bold-blur-20 lg:shadow-bold-blur-20-dark h-28 rounded-2xl">
              <Loading
                isLoading={size(listingTabs) === 0}
                loader={<HomeListingTabsSkeleton />}>
                <Slider
                  sliderIdentifier="listing-details"
                  slidesPerView={isMobile ? 3 : 7}
                  spaceBetween={0}
                  sliderContainerClassName="h-full w-full px-5 lg:px-10"
                  sliderWrapperClassName="h-full"
                  customNavigation={<CustomNavigation />}>
                  {map(listingTabs, (listingTab) => (
                    <div
                      key={get(listingTab, "id")}
                      className={`tab border-b-none text-grey-600 text-base lg:text-xl lg:pb-2 px-0 h-full w-full flex flex-col items-center ${
                        get(listingTab, "id") === activeTab
                          ? "tab-active text-primary"
                          : "border-b-transparent"
                      }`}
                      onClick={() => setActiveTab(get(listingTab, "id"))}>
                      {/*<Image*/}
                      {/*  className="mb-2"*/}
                      {/*  src={listingTab.image}*/}
                      {/*  width={32}*/}
                      {/*  height={32}*/}
                      {/*  alt="image"*/}
                      {/*  {...(key === activeTab && {*/}
                      {/*    style: {*/}
                      {/*      filter:*/}
                      {/*        "invert(22%) sepia(53%) saturate(5680%) hue-rotate(332deg) brightness(84%) contrast(93%)"*/}
                      {/*    }*/}
                      {/*  })}*/}
                      {/*/>*/}
                      <Typography element="h6" variant="h6">
                        {get(listingTab, "name")}
                      </Typography>
                      {get(listingTab, "id") === activeTab && (
                        <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-2"></div>
                      )}
                    </div>
                  ))}
                </Slider>
              </Loading>
            </div>
            <Loading
              isLoading={size(listingTabDetails) === 0}
              loader={<HomeListingBodySkeleton />}>
              {size(listingTabDetails) > 0 && (
                <div className="tab-content mt-4">
                  {isMobile ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 lg:overflow-x-hidden gap-4 p-1">
                      {map(listingTabDetails, (listing, key) => (
                        <ListingListItem key={key} listing={listing} />
                      ))}
                    </div>
                  ) : (
                    <Slider
                      sliderIdentifier="listing-details-content"
                      slidesPerView={isMobile ? 1 : 4}
                      sliderWrapperClassName="py-1"
                      spaceBetween={10}>
                      {map(listingTabDetails, (listing, key) => (
                        <ListingListItem key={key} listing={listing} />
                      ))}
                    </Slider>
                  )}
                </div>
              )}
            </Loading>
          </div>
          {size(listingTabDetails) > 0 && (
            <div className="w-full flex justify-center items-center mt-10">
              <Button
                variant="btn-primary"
                link="/listing"
                className="bg-primary-50 text-primary border-primary-25 hover:bg-primary hover:border-primary group">
                <span className="group-hover:text-white text-xl font-mi-sans-semi-bold">
                  {/*See All Blogs*/}
                  {t("see_all_properties")}
                </span>
                <RightArrow className="scale-50 fill-primary group-hover:fill-white" />
              </Button>
            </div>
          )}
        </Section>
      )}
    </>
  );
};

export default ListingDetails;
