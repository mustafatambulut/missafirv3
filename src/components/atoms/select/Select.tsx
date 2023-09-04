"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { filter, get, map, size } from "lodash";
import { isMobile } from "react-device-detect";
import ReactSelect, { components } from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";

import ClearIcon from "../../../../public/images/clear.svg";
import SearchIcon from "../../../../public/images/search.svg";
import HistoryIcon from "../../../../public/images/history.svg";
import LocationIcon from "../../../../public/images/location.svg";
import { ISelect } from "@/components/atoms/select/types";

const Select = ({
  items,
  onChange,
  name = "",
  value = null,
  className = "",
  placeHolder = "",
  controlTitle = "",
  customIcon = null,
  menuIsOpen = null,
  iconOffset = false,
  isClearable = false,
  maxMenuHeight = null,
  isSearchable = false,
  noResultsMessage = "",
  searchId = "search-id",
  showOptionIcon = false,
  searchIconColor = null,
  showSearchIcon = false,
  customIconPosition = "left",
  searchIconPosition = "left",
  placeholderClassName = null,
  controlTitleClassName = null,
  controlWrapperClassName = ""
}: ISelect) => {
  const searchClass = classNames(`w-full ${className}`);
  const controlWrapperClass = classNames(
    `rounded-lg border-none shadow-none text-left ${controlWrapperClassName}`,
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
      "left-0": customIconPosition === "left" && !iconOffset,
      "right-0": customIconPosition === "right" && !iconOffset,
      "left-2": customIconPosition === "left" && iconOffset,
      "right-2": customIconPosition === "right" && iconOffset
    }
  );
  const searchIconClass = classNames(
    "absolute top-[50%] transform translate-y-[-50%]",
    {
      "left-0": searchIconPosition === "left" && !iconOffset,
      "right-0": searchIconPosition === "right" && !iconOffset,
      "left-2": searchIconPosition === "left" && iconOffset,
      "right-2": searchIconPosition === "right" && iconOffset,
      "fill-gray-800": !searchIconColor,
      [searchIconColor]: searchIconColor
    }
  );

  const controlTitleClass = classNames("hidden lg:block w-full", {
    "text-gray-600 text-sm": !controlTitleClassName,
    [controlTitleClassName]: controlTitleClassName
  });
  const placeholderClass = classNames("hidden lg:block w-full", {
    "text-gray-600 text-base lg:text-lg font-mi-semi-bold":
      !placeholderClassName,
    [placeholderClassName]: placeholderClassName
  });
  return (
    <ReactSelect
      name={name}
      {...(value && {
        value: filter(items, (item) => item.value === value)
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
                  <SearchIcon className={searchIconClass} />
                </div>
              )}
              {customIcon && (
                <div className={customIconClass}>{customIcon}</div>
              )}
              <div className="flex-wrap flex w-full h-full">
                {controlTitle && (
                  <div className={controlTitleClass}>{controlTitle}</div>
                )}
                {get(props, "children")}
              </div>
            </div>
          </components.Control>
        ),
        Placeholder: (props) => (
          <components.Placeholder className="m-0" {...props}>
            <div className={placeholderClass}>
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
            className="rounded-xl mt-5 z-20 shadow-none lg:shadow-md z-50"
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

export default Select;
