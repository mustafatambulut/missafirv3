"use client";
import { useState } from "react";
import {
  get,
  map,
  find,
  omit,
  size,
  join,
  clone,
  split,
  compact,
  includes,
  lowerCase,
  difference
} from "lodash";
import classNames from "classnames";
import Select, { Theme } from "react-select";
import { usePathname, useRouter } from "next/navigation";

import { Route } from "@/utils/route";
import { LOCALES } from "@/app/constants";
import { useAppSelector } from "@/redux/hooks";
import { addSuffix, getCurrentLang } from "@/utils/helper";
import { ISelectLanguage } from "@/components/atoms/selectLanguage/types";

import Control from "@/components/atoms/control/Control";
import SelectMenu from "@/components/atoms/selectMenu/SelectMenu";
import LangOption from "@/components/atoms/langOption/LangOption";
import SingleValue from "@/components/atoms/singleValue/SingleValue";
import SelectMenuList from "@/components/atoms/selectMenuList/SelectMenuList";
import DropdownIndicator from "@/components/atoms/dropdownIndicator/DropdownIndicator";

const SelectLanguage = ({
  variant,
  languages,
  showIndicator,
  className = ""
}: ISelectLanguage) => {
  const router = useRouter();
  const pathName = usePathname();
  const [currentLocale] = useState(lowerCase(getCurrentLang()));
  const { links } = useAppSelector((state) => state.listingDetailReducer);

  const langs = map(get(languages, "data"), (language: any) => {
    const cloned = clone(language);

    return {
      attributes: {
        ...get(omit(cloned, ["attributes.value"]), "attributes"),
        value: lowerCase(get(language, "attributes.value"))
      }
    };
  });

  const selectClass = classNames(`text-sm rounded-xl ${className}`, {
    "bg-gray-100": variant === "light",
    "bg-none": variant === "dark"
  });

  const optionClass = classNames(
    `my-1 p-0 m-0 rounded-lg text-gray-700 cursor-pointer focus:text-black hover:bg-gray-100
      focus:bg-gray-hover`
  );

  const singleValueChildrenClass = classNames(
    "text-base uppercase ml-2 text-lg",
    {
      "text-white": variant === "dark",
      "text-black": variant === "light"
    }
  );

  const menuClass = classNames("rounded-lg bg-white");

  const controlClass = classNames(
    "cursor-pointer shadow-none bg-transparent text-xs lg:text-base h-12 rounded-xl",
    {
      "border-none": variant === "light"
    }
  );

  const config = {
    imageShow: true,
    isSearchable: false,
    defaultValue: find(langs, ["attributes.value", currentLocale]),
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
    controlClass,
    singleValueChildrenClass
  };

  const handleOnChange = ({ attributes }) => {
    const route = Route;
    const suffix = addSuffix(get(attributes, "value"));
    const slug = get(
      find(links, get(attributes, "value")),
      get(attributes, "value")
    );
    const staticRoutes = map(get(route, "statics"), get(attributes, "value"));
    const path = difference(compact(split(pathName, "/")), LOCALES);

    if (!size(path)) {
      path.unshift(get(attributes, "value"));
      return router.push(`/${join(path, "/")}`);
    } else if (slug && !includes(staticRoutes, path[0])) {
      return router.push(`/${get(attributes, "value")}/${slug}-${suffix}`);
    } else {
      path.unshift(get(attributes, "value"));
      return router.push(`/${join(path, "/")}`);
    }
  };

  return (
    <Select
      width={24}
      height={24}
      type="language"
      onChange={handleOnChange}
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
      controlClassName={get(config, "controlClass")}
      singleValueClassName="flex items-center gap-x-0.5 justify-around"
      optionLabelClassName="text-base lg:text-lg py-2 uppercase font-mi-sans"
      singleValueChildrenClassName={get(config, "singleValueChildrenClass")}
      components={{
        Option: LangOption,
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
      options={langs}
      imageShow={get(config, "imageShow")}
      defaultValue={get(config, "defaultValue")}
      isSearchable={get(config, "isSearchable")}
    />
  );
};

export default SelectLanguage;
