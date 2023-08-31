"use client";
import { ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";
import { get, map, size } from "lodash";
import { isMobile } from "react-device-detect";
import Select, { components } from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";

import { ISearch } from "@/components/atoms/search/types";

import ClearIcon from "../../../../public/images/clear.svg";
import SearchIcon from "../../../../public/images/search.svg";
import HistoryIcon from "../../../../public/images/history.svg";
import LocationIcon from "../../../../public/images/location.svg";

const Search = ({
  items,
  onChange,
  className = "",
  customIcon = null,
  placeHolder = "",
  controlTitle = "",
  isClearable = true,
  isSearchable = true,
  noResultsMessage = "",
  showSearchIcon = true,
  showOptionIcon = false,
  customIconPosition = "left",
  searchIconPosition = "left",
  controlWrapperClassName = "",
  searchId = "search-id",
  value = null,
  menuIsOpen = null,
  maxMenuHeight = null
}: ISearch) => {
  const searchClass = classNames(`w-full ${className}`);
  const controlWrapperClass = classNames(
    `input height-[3rem] rounded-lg border-none shadow-none text-left ${controlWrapperClassName}`,
    {
      "pl-10":
        (customIcon && customIconPosition === "left") ||
        (showSearchIcon && searchIconPosition === "left"),
      "pr-10":
        (customIcon && customIconPosition === "right") ||
        (showSearchIcon && searchIconPosition === "right")
    }
  );
  const controlInnerClass = classNames(`w-full text-gray-800 ${className}`);
  const customIconClass = classNames(
    "absolute top-[50%] transform translate-y-[-50%]",
    {
      "left-2": customIconPosition === "left",
      "right-2": customIconPosition === "right"
    }
  );
  const searchIconClass = classNames(
    "absolute top-[50%] transform translate-y-[-50%]",
    {
      "left-2": searchIconPosition === "left",
      "right-2": searchIconPosition === "right"
    }
  );

  return (
    <Select
      {...(value && {
        value: value
      })}
      {...(menuIsOpen && { menuIsOpen: menuIsOpen })}
      {...(maxMenuHeight && { menuIsOpen: maxMenuHeight })}
      onChange={onChange}
      options={items}
      id={`id-${searchId}`}
      key={`key-${searchId}`}
      className={searchClass}
      isClearable={isClearable}
      isSearchable={isSearchable}
      inputId={`input-${searchId}`}
      instanceId={`select-${searchId}`}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        Control: (props) => (
          <components.Control className={controlWrapperClass} {...props}>
            <div className={controlInnerClass}>
              {showSearchIcon && (
                <div className={searchIconClass}>
                  <SearchIcon className="fill-gray-800" />
                </div>
              )}
              {customIcon && (
                <div className={customIconClass}>{customIcon}</div>
              )}
              <div className="flex-wrap flex w-full h-full">
                {controlTitle && (
                  <div className="text-gray-600 w-full text-sm hidden lg:block">
                    {controlTitle}
                  </div>
                )}
                {get(props, "children")}
              </div>
            </div>
          </components.Control>
        ),
        Placeholder: (props) => (
          <components.Placeholder className="m-0" {...props}>
            <div className="text-gray-600 text-base lg:text-lg font-mi-semi-bold">
              {placeHolder && <> {placeHolder} </>}
            </div>
          </components.Placeholder>
        ),
        NoOptionsMessage: (props) => (
          <components.NoOptionsMessage
            className={`${get(props, "selectProps.noOptionsMessageClassName")}`}
            {...props}>
            <div
              className={`${get(
                props,
                "selectProps.noOptionsMessageInnerClassName"
              )}`}>
              {noResultsMessage ? <>{noResultsMessage}</> : <>No results</>}
            </div>
          </components.NoOptionsMessage>
        ),
        Menu: (props) => (
          <components.Menu
            className="rounded-xl mt-5 z-20 shadow-none lg:shadow-md"
            {...props}>
            <div className={`${get(props, "selectProps.menuInnerClassName")}`}>
              {get(props, "children")}
            </div>
          </components.Menu>
        ),
        Group: (props) => {
          const isPopularDestinations = get(
            props,
            "data.isPopularDestinations"
          );
          if (isPopularDestinations && !isMobile) {
            return null;
          }
          return (
            <components.Group
              className={`${get(props, "selectProps.groupClassName")}`}
              {...props}>
              <div
                className={`${get(props, "selectProps.groupInnerClassName")}`}>
                {isPopularDestinations ? (
                  <Swiper spaceBetween={0} slidesPerView={3} className="pr-16">
                    {map(get(props, "children"), (child: ReactNode, key) => (
                      <SwiperSlide key={key}>{child}</SwiperSlide>
                    ))}
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
              isMobile ? "rsi-container absolute w-full" : null
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
                } rounded flex items-start p-1`}>
                {showOptionIcon && (
                  <>
                    {!isPopularDestinations ? (
                      get(props, "data.isHistory") ? (
                        <HistoryIcon className="mt-1" />
                      ) : (
                        <LocationIcon className="mt-1" />
                      )
                    ) : null}
                  </>
                )}
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
  );
};

export default Search;
