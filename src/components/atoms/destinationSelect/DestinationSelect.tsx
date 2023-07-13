/*eslint-disable*/
"use client";
import React from "react";
import Image from "next/image";
import { get, size } from "lodash";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";

import { IDestinationSelect } from "@/components/atoms/destinationSelect/types";

import "swiper/css";
import "./DestinationSelect.css";

import HistoryIcon from "../../../../public/images/history.svg";
import ClearIcon from "../../../../public/images/clear-icon.svg";
import LocationIcon from "../../../../public/images/location.svg";
import SearchIcon from "../../../../public/images/search-icon.svg";

const DestinationSelect = ({
  setActiveSearchItem,
  setBookingDestination,
  componentId
}: IDestinationSelect) => {
  // const isMobileView = () => get(window, "screen.width") <= 600;
  const destinationOptions = [
    {
      label: "Popular Destinations",
      isPopularDestinations: true,
      options: [
        {
          value: "london",
          label: "London",
          desc: "United Kingdom",
          image: "destination.jpg",
          isPopularDestinations: true,
          isHistory: false
        },
        {
          value: "newyork",
          label: "New York",
          desc: "United States",
          image: "destination.jpg",
          isPopularDestinations: true,
          isHistory: false
        },
        {
          value: "istanbul",
          label: "Istanbul",
          desc: "Turkey",
          image: "destination.jpg",
          isPopularDestinations: true,
          isHistory: false
        },
        {
          value: "antalya",
          label: "Antalya",
          desc: "Turkey",
          image: "destination.jpg",
          isPopularDestinations: true,
          isHistory: false
        },
        {
          value: "stockholm",
          label: "Stockholm",
          desc: "Sweden",
          image: "destination.jpg",
          isPopularDestinations: true,
          isHistory: false
        }
      ]
    },
    {
      value: "icmeler",
      label: "İçmeler",
      isPopularDestinations: false,
      desc: "Marmaris/Muğla, Türkiye",
      isHistory: false
    },
    {
      value: "uzungol",
      label: "Uzungöl",
      isPopularDestinations: false,
      desc: "Çaykara/Trabzon, Türkiye",
      isHistory: false
    },
    {
      label: "En Son Bakılanlar",
      isPopularDestinations: false,
      options: [
        {
          value: "uzungol",
          label: "Uzungöl",
          desc: "Çaykara/Trabzon, Türkiye",
          isPopularDestinations: false,
          isHistory: true
        }
      ]
    }
  ];

  const filterOptions = (inputValue: string) => {
    return destinationOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    // eslint-disable-next-line no-unused-vars
    callback: (inputValue: any) => void
  ) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  const handleOnChange = (e: any) => {
    if (e) {
      setActiveSearchItem("bookingDate");
    }
    setBookingDestination(e);
  };

  return (
    <div className="relative">
      <AsyncSelect
        key={`key-${componentId}`}
        id={`id-${componentId}`}
        inputId={`input-${componentId}`}
        classNames={{
          control: (state) => (state.isFocused ? "lg:bg-gray-50" : "bg-white")
        }}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        instanceId="msfr-destination-select"
        onChange={handleOnChange}
        // maxMenuHeight={isMobileView() ? 500 : 400}
        maxMenuHeight={true == 0 ? 500 : 400}
        //todo: controlClassName,controlInnerClassName type hatası veriyor buna bakılacak
        // controlClassName="w-full border-none shadow-none rounded-2xl h-14"
        // controlInnerClassName="flex w-full text-left items-center px-4 py-0.5 h-full"
        // placeholderClassName="m-0"
        // placeholderInnerClassName="text-gray-600 text-base lg:text-lg font-mi-semi-bold"
        // valueContainerClassName="pl-0"
        // indicatorsContainerClassName="absolute right-2 top-[50%] transform translate-y-[-50%]"
        // inputClassName={`m-0 p-0 ${
        //   isMobileView() ? "rsi-container absolute w-full" : null
        // }`}
        // menuClassName="rounded-xl mt-5 z-20 shadow-none"
        // whereTitleClassName="text-gray-600 w-full text-sm hidden lg:block"
        // searchIconClassName="mr-3 hidden lg:block"
        // optionClassName="bg-transparent text-left cursor-pointer m-0 pt-2 pb-0 px-0 lg:px-3"
        // optionInnerClassName="rounded flex items-start p-1"
        // optionLabelClassName="text-gray-800 lg:text-base text-xs mt-1 font-mi-semi-bold"
        // optionContentClassName="text-gray-500 text-xs"
        // groupHeadingClassName="px-4"
        // groupHeadingInnerClassName="text-left normal-case text-gray-500 text-sm font-mi-semi-bold"
        isClearable
        isSearchable
        className={`w-full items-center flex ${
          true == 0 && "border rounded-2xl"
          // isMobileView() && "border rounded-2xl"
        }`}
        {...(true == 0 && { menuIsOpen: true })}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          LoadingIndicator: () => null,
          Control: (props) => (
            <components.Control
              className="w-full border-none shadow-none rounded-2xl h-14"
              {...props}>
              <div className="flex w-full text-left items-center px-4 py-0.5 h-full">
                <div className="mr-3 hidden lg:block">
                  <SearchIcon />
                </div>
                <div className="flex-wrap flex w-full h-full">
                  <div className="text-gray-600 w-full text-sm hidden lg:block">
                    Where
                  </div>
                  {get(props, "children")}
                </div>
              </div>
            </components.Control>
          ),
          Placeholder: (props) => (
            <components.Placeholder className="m-0" {...props}>
              <div className="text-gray-600 text-base lg:text-lg font-mi-semi-bold">
                {/*{isMobileView()*/}
                {true == 0 ? "Where do you want to go?" : "Search destinations"}
              </div>
            </components.Placeholder>
          ),
          NoOptionsMessage: (props) => (
            <components.NoOptionsMessage
              className={`${get(
                props,
                "selectProps.noOptionsMessageClassName"
              )}`}
              {...props}>
              <div
                className={`${get(
                  props,
                  "selectProps.noOptionsMessageInnerClassName"
                )}`}>
                No destinations
              </div>
            </components.NoOptionsMessage>
          ),
          Menu: (props) => (
            <components.Menu
              className="rounded-xl mt-5 z-20 shadow-none"
              {...props}>
              <div
                className={`${get(props, "selectProps.menuInnerClassName")}`}>
                {get(props, "children")}
              </div>
            </components.Menu>
          ),
          Group: (props) => {
            const isPopularDestinations = get(
              props,
              "data.isPopularDestinations"
            );
            // if (isPopularDestinations && !isMobileView()) return null;
            if (isPopularDestinations && true == 1) return null;
            return (
              <components.Group
                className={`${get(props, "selectProps.groupClassName")}`}
                {...props}>
                <div
                  className={`${get(
                    props,
                    "selectProps.groupInnerClassName"
                  )}`}>
                  {isPopularDestinations ? (
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={3}
                      className="pr-16">
                      {/*{props?.children?.map((child, key) => (*/}
                      {/*  <SwiperSlide key={key}>{child}</SwiperSlide>*/}
                      {/*))}*/}
                    </Swiper>
                  ) : (
                    get(props, "children")
                  )}
                </div>
              </components.Group>
            );
          },
          Input: (props) => (
            <components.Input
              className={`m-0 p-0 ${
                // isMobileView() ? "rsi-container absolute w-full" : null
                true == 0 ? "rsi-container absolute w-full" : null
              }`}
              {...props}>
              {get(props, "children")}
            </components.Input>
          ),
          ValueContainer: (props) => (
            <components.ValueContainer className="pl-0" {...props}>
              {get(props, "children")}
            </components.ValueContainer>
          ),
          IndicatorsContainer: (props) => (
            <components.IndicatorsContainer
              className="absolute right-2 top-[50%] transform translate-y-[-50%]"
              {...props}>
              {get(props, "children")}
            </components.IndicatorsContainer>
          ),
          ClearIndicator: (props) => (
            <components.ClearIndicator
              className={`${get(props, "selectProps.clearIndicatorClassName")}`}
              {...props}>
              <ClearIcon />
            </components.ClearIndicator>
          ),
          Option: (props) => {
            const image = get(props, "data.image");
            const isPopularDestinations = get(
              props,
              "data.isPopularDestinations"
            );
            return (
              <components.Option
                className="bg-transparent text-left cursor-pointer m-0 pt-2 pb-0 px-0 lg:px-3"
                {...props}>
                <div
                  className={`${
                    isPopularDestinations && "text-center"
                  } "rounded flex items-start p-1"`}>
                  {!isPopularDestinations ? (
                    get(props, "data.isHistory") ? (
                      <HistoryIcon className="mt-1" />
                    ) : (
                      <LocationIcon className="mt-1" />
                    )
                  ) : null}
                  <div
                    className={`flex flex-col ${
                      !isPopularDestinations && "ml-2"
                    }`}>
                    {image && (
                      <Image
                        src={`/images/${image}`}
                        alt="destination"
                        width={93}
                        height={81}
                        className="rounded-2xl"
                      />
                    )}
                    <span className="text-gray-800 lg:text-base text-xs mt-1 font-mi-semi-bold">
                      {get(props, "data.label")}
                    </span>
                    {!isPopularDestinations && (
                      <span className="text-gray-500 text-xs">
                        {get(props, "data.desc")}
                      </span>
                    )}
                  </div>
                </div>
              </components.Option>
            );
          },
          GroupHeading: (props) => (
            <components.GroupHeading className="px-4" {...props}>
              <div
                className={`${
                  size(get(props, "selectProps.options")) > 1 &&
                  "border-t pt-4 mt-3"
                } text-left normal-case text-gray-500 text-sm font-mi-semi-bold`}>
                {get(props, "children")}
              </div>
            </components.GroupHeading>
          )
        }}
      />
    </div>
  );
};

export default DestinationSelect;
