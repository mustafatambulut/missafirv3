"use client";
import React, { useState } from "react";
import Image from "next/image";
import { find, get } from "lodash";
import Select, { components } from "react-select";

import { ILanguageSelect } from "@/components/atoms/languageSelect/types";
import SelectLangOptionImage from "@/components/atoms/selectLangOptionImage";

const LanguageSelect = ({ variant, links, showIndicator }: ILanguageSelect) => {
  const [currentLocale] = useState("en");

  const handleMenuOpen = () => null;

  const handleMenuClose = () => null;

  const handleOnChange = () => null;

  return (
    <Select
      imageShow
      options={get(links, "data")}
      onChange={handleOnChange}
      isSearchable={false}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      menuClassName="rounded-lg"
      menuListClassName="m-0 p-0"
      imageWidthClassName="w-6 lg:w-2 lg:w-6"
      indicatorClassName="pl-0 pr-2"
      indicatorArrowClassName="fill-owner"
      controlClassName="cursor-pointer shadow-none bg-transparent  text-xs lg:text-base lg:h-[44px] rounded-[10px] border-white"
      optionClassName="my-1 p-0 m-0 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 focus:text-black focus:bg-gray-hover"
      singleValueClassName="flex items-center gap-x-0.5 justify-around"
      singleValueChildrenClassName={`${
        variant === "dark" ? "text-white" : "text-black"
      }`}
      defaultValue={find(get(links, "data"), [
        "attributes.value",
        currentLocale
      ])}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "white",
          primary: "white"
        }
      })}
      components={{
        Menu: (props) => (
          <components.Menu
            {...props}
            className={`${get(props, "selectProps.menuClassName")}`}>
            {get(props, "children")}
          </components.Menu>
        ),
        MenuList: (props) => (
          <components.MenuList
            {...props}
            className={`${get(props, "selectProps.menuClassName")}`}>
            <div>{get(props, "children")}</div>
          </components.MenuList>
        ),
        SingleValue: (props) => (
          <components.SingleValue {...props}>
            <div
              className={`${
                get(props, "selectProps.singleValueClassName") || "gap-3"
              }`}>
              {get(props, "selectProps.imageShow") && (
                <div className="avatar">
                  <div
                    className={`${
                      get(props, "selectProps.imageWidthClassName") ||
                      "w-8 lg:w-10"
                    } rounded-full`}>
                    <Image
                      src={get(props, "data.attributes.image")}
                      width={24}
                      height={24}
                      alt="select"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1">
                <span className={`text-xs capitalize `}>
                  {get(props, "selectProps.selectTitle")}
                </span>
                <span
                  className={`text-sm uppercase ml-2 ${get(
                    props,
                    "selectProps.singleValueChildrenClassName"
                  )}`}>
                  {get(props, "data.attributes.label")}
                </span>
              </div>
            </div>
          </components.SingleValue>
        ),
        DropdownIndicator: (props) =>
          showIndicator ? (
            <components.DropdownIndicator {...props}>
              {get(props, "children")}
            </components.DropdownIndicator>
          ) : null,
        Option: (props) => (
          <components.Option
            className={`${get(props, "selectProps.optionClassName")} ${
              get(props, "isSelected") ? "bg-gray-150 text-black" : ""
            }`}
            {...props}>
            <div className="flex gap-x-2 items-center justify-center">
              <SelectLangOptionImage
                image={get(props, "data.attributes.image")}
                className="w-6 p-0 m-0"
              />
              <span className="text-sm py-2 uppercase">
                {get(props, "data.attributes.label")}
              </span>
            </div>
          </components.Option>
        ),
        Control: (props) => (
          <components.Control
            className={`${get(props, "selectProps.controlClassName")}`}
            {...props}>
            <div className="flex">{get(props, "children")}</div>
          </components.Control>
        ),
        IndicatorSeparator: () => null
      }}
      className={`text-sm ${
        variant !== "dark" && "bg-grey-100"
      } rounded-[12px]`}
    />
  );
};

export default LanguageSelect;
