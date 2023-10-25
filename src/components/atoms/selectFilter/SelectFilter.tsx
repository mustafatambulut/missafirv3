"use client";
import React from "react";
import { get} from "lodash";

import { ISelectFilter } from "@/components/atoms/selectFilter/types";


import Select from "@/components/atoms/select/Select";

import AllIcon from "../../../../public/images/circles.svg";
import PlaneIcon from "../../../../public/images/plane.svg";
import ConfirmedIcon from "../../../../public/images/confirmed.svg";
import CancelledIcon from "../../../../public/images/cancelled.svg";
import DownArrowIcon from "../../../../public/images/down_arrow.svg";

const SelectFilter = ({ onChange }: ISelectFilter) => {
  // todo: dil seçeneği ekleyince güncellenecek
  const filterOptions = [
    {
      type: "filter",
      value: "",
      label: "All",
      icon: <AllIcon className="fill-gray" />
    },
    {
      type: "filter",
      value: "confirmed",
      label: "Confirmed",
      icon: <ConfirmedIcon className="fill-gray" />
    },
    {
      type: "filter",
      value: "pending",
      label: "Pending",
      icon: <PlaneIcon className="fill-gray" />
    },
    {
      type: "filter",
      value: "cancelled",
      label: "Cancelled",
      icon: <CancelledIcon className="fill-gray" />
    }
  ];

  return (
    <Select
      rotateIconOnShow={true}
      showPlaceholder={false}
      showControlTitle={false}
      menuClassName="border border-gray-300 lg:border-none w-full"
      controlWrapperClassName="px-3 py-1"
      iconOffset={true}
      searchId="reservation-filter"
      name="reservation-filter"
      defaultValue={filterOptions[0]}
      items={filterOptions}
      isSearchable={false}
      isClearable={false}
      showSearchIcon={false}
      customIconPosition="right"
      customIcon={<DownArrowIcon className="fill-gray-600 scale-150" />}
      onChange={(value) => onChange(get(value, "attributes.value"))}
    />
  );
};

export default SelectFilter;
