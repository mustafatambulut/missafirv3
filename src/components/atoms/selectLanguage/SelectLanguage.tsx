"use client";
import { useState } from "react";
import { find, get } from "lodash";
import classNames from "classnames";
import Select, { Theme } from "react-select";

import { ISelectLanguage } from "@/components/atoms/selectLanguage/types";

import Option from "@/components/atoms/option/Option";
import Control from "@/components/atoms/control/Control";
import SelectMenu from "@/components/atoms/selectMenu/SelectMenu";
import SingleValue from "@/components/atoms/singleValue/SingleValue";
import SelectMenuList from "@/components/atoms/selectMenuList/SelectMenuList";
import DropdownIndicator from "@/components/atoms/dropdownIndicator/DropdownIndicator";

const SelectLanguage = ({
  variant,
  languages,
  showIndicator,
  className = ""
}: ISelectLanguage) => {
  //todo: dil seçeneği ekleyince güncellenecek
  const [currentLocale] = useState("TR");
  const selectClass = classNames(`text-sm rounded-xl ${className}`, {
    "bg-gray-700": variant === "dark",
    "bg-none": variant === "ghost",
    "bg-gray-100": variant === "gray"
  });

  const optionClass = classNames(
    "my-1 p-0 m-0 rounded-lg cursor-pointer focus:text-black lg:text-lg flex gap-x-2 items-center justify-center",
    {
      "bg-gray-700": variant === "dark",
      "hover:bg-gray-600": variant === "dark",
      "text-white": variant === "dark",
      "hover:bg-gray-100": variant === "ghost" || variant === "gray",
      "focus:bg-gray-hover": variant === "ghost" || variant === "gray"
    }
  );

  const singleValueChildrenClass = classNames(
    "text-base uppercase ml-2 text-lg",
    {
      "text-white": variant === "dark" || variant === "ghost",
      "text-black": variant === "gray"
    }
  );

  const menuClass = classNames("rounded-lg", {
    "bg-gray-700": variant === "dark"
  });

  const config = {
    imageShow: true,
    isSearchable: false,
    defaultValue: find(get(languages, "data"), [
      "attributes.value",
      currentLocale
    ]),
    theme: (theme: Theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: "white",
        primary: "white"
      }
    }),
    menuClass,
    optionClass,
    selectClass,
    singleValueChildrenClass
  };

  return (
    <Select
      optionImageWidth={24}
      optionImageHeight={24}
      imageWidthClassName="w-6"
      menuListClassName="m-0 p-1"
      indicatorClassName="pl-0 pr-2"
      optionImageClassName="rounded-full"
      controlInnerClassName="flex w-full"
      indicatorArrowClassName="fill-owner"
      optionImageWrapperClassName="w-6 p-0 m-0"
      className={get(config, "selectClass")}
      menuClassName={get(config, "menuClass")}
      optionSelectedClassName="bg-gray-150 text-black"
      optionClassName={get(config, "optionClass")}
      singleValueChildrenClassName={get(config, "singleValueChildrenClass")}
      singleValueClassName="flex items-center gap-x-0.5 justify-around"
      optionLabelClassName="text-sm lg:text-lg py-2 uppercase font-mi-sans-semi-bold"
      controlClassName="cursor-pointer shadow-none bg-transparent text-xs lg:text-base h-11 rounded-x border-white"
      components={{
        Option: Option,
        Control: Control,
        Menu: SelectMenu,
        SingleValue: SingleValue,
        MenuList: SelectMenuList,
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => (
          <DropdownIndicator props={props} showIndicator={showIndicator} />
        )
      }}
      theme={get(config, "theme")}
      options={get(languages, "data")}
      imageShow={get(config, "imageShow")}
      defaultValue={get(config, "defaultValue")}
      isSearchable={get(config, "isSearchable")}
    />
  );
};

export default SelectLanguage;
