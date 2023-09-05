"use client";
import { get, map } from "lodash";
import Image from "next/image";
import { isMobile } from "react-device-detect";

import { useAppSelector } from "@/redux/hooks";
import { STEP_1 } from "@/redux/features/ownerSlice/enum";
import { IBecomeOwnerLayout } from "@/app/[lang]/become-owner/types";
import BecomeOwnerTypes from "@/components/molecules/becomeOwnerTypes/BecomeOwnerTypes";

import Button from "@/components/atoms/button/Button";
import News from "@/components/molecules/news/News";
import Banner from "@/components/molecules/banner/Banner";
import Section from "@/components/molecules/section/Section";
import ListingListItem from "@/components/molecules/listingListItem/ListingListItem";
import BecomeOwnerLanding from "@/components/organisms/becomeOwnerLanding/BecomeOwnerLanding";

import HeartIcon from "../../../../public/images/heart.svg";
import RightArrow from "../../../../public/images/chevron_right.svg";

const BecomeOwnerLayout = ({ children }: IBecomeOwnerLayout) => {
  const { currentStep } = useAppSelector((state) => state.ownerReducer);
  const { listings, banner } = useAppSelector((state) => state.ownerReducer);
  return currentStep === STEP_1 ? (
    <BecomeOwnerLanding />
  ) : (
    <section className="mt-20 lg:mt-48 flex flex-col gap-y-10 lg:gap-y-20 relative px-4 lg:px-40 overflow-hidden">
      <Section className="flex justify-center mt-12">
        <div className="relative">
          <Image
            src="/images/owner_home.png"
            alt="owner-home"
            width={900}
            height={isMobile ? 240 : 450}
          />
          <div className="absolute top-[90%] lg:top-[10%] left-[30%] translate-x-[-50%] lg:left-[90%] backdrop-blur-3xl w-44 lg:w-80 shadow text-sm lg:text-xl lg:font-mi-sans-semi-bold text-gray-800 text-center p-2 lg:p-4 rounded-xl">
            In-house technology and world-class marketing
          </div>
          <div className="absolute top-[-13%] lg:top-[10%] left-[50%] translate-x-[-50%] lg:left-[90%] backdrop-blur-3xl w-36 lg:w-64 shadow text-sm lg:text-xl lg:font-mi-sans-semi-bold text-gray-800 text-center p-2 lg:p-4 rounded-xl">
            End-to-end property management
          </div>
          <div className="absolute top-[31%] lg:top-[10%] left-[58%] translate-x-[-50%] lg:left-[90%] backdrop-blur-3xl w-40 lg:w-80 shadow text-sm lg:text-xl lg:font-mi-sans-semi-bold text-white text-center p-2 lg:p-4 rounded-xl">
            Premium furnishings and modern decoration
          </div>
          <HeartIcon className="absolute lg:top-[75%] lg:left-[87%] left-[63%] top-[48%] scale-125 z-20 lg:z-0" />
        </div>
      </Section>
      <main>
        <div className="mt-24 lg:hidden text-center">
          <h1 className="text-28 font-mi-sans-semi-bold mb-5">
            Find Out Your Potential Rental Income
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
        </div>
        <div className="my-10 w-full lg:w-1/2 mx-auto">
          <BecomeOwnerTypes />
        </div>
        <section>{children}</section>
      </main>
      {/*todo: timeline gelecek*/}
      {/*<section>Timeline</section>*/}
      <Section className="flex flex-col lg:flex-row items-center gap-x-4">
        <Image
          src="/images/owner_image.png"
          alt="owner-image"
          className="object-cover"
          height={777}
          width={670}
        />
        <div className="flex flex-col gap-y-6 items-start justify-center">
          <div className="text-4xl font-mi-sans-semi-bold text-gray-700">
            Grow your income with <span>Owner App</span>
          </div>
          <p className="text-2xl">
            The easiest way to review your property’s income, expense and
            calendar.
          </p>
          <div className="flex gap-x-4">
            <Image
              src="/images/appstore.png"
              alt="app-store"
              width={196}
              height={60}
            />
            <Image
              src="/images/playstore.png"
              alt="play-store"
              width={196}
              height={60}
            />
          </div>
        </div>
      </Section>
      <Section
        className="flex flex-col gap-y-10"
        title="Discover Missafir Signature Homes for an unique experience"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-5">
          {map(listings, (listing, index) => (
            <ListingListItem listing={listing} key={index} />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Button
            variant="btn-primary"
            link="/"
            className="mt-10 bg-primary-50 text-primary border-primary-25 hover:bg-primary hover:border-primary group">
            <span className="group-hover:text-white text-xl font-mi-sans-semi-bold">
              See All Properties
            </span>
            <RightArrow className="scale-50 fill-primary group-hover:fill-white" />
          </Button>
        </div>
      </Section>
      <section>
        <Banner
          className="relative overflow-hidden"
          type="primary"
          title={get(banner, "title")}
          body={get(banner, "description")}>
          <Button
            link={get(banner, "link")}
            variant="btn-white"
            className="border-none text-28 text-primary">
            Contact Us
          </Button>
        </Banner>
      </section>
      <News
        newsPerView={3}
        buttonPosition="right"
        cols="grid-cols-1 lg:grid-cols-3"
      />
    </section>
  );
};

export default BecomeOwnerLayout;
