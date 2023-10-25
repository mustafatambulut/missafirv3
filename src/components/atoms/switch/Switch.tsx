"use client";
import { get, isEqual, map } from "lodash";
import classNames from "classnames";
import { useAppSelector } from "@/redux/hooks";

import {ISwitch} from "@/components/atoms/switch/types";

const Switch = ({ filterItem, handleFilter }: ISwitch) => {
  const  filterData  = useAppSelector((state) => state.listingReducer.filterData);
  const toggleItemClass = (id, item) => {
    return classNames(
      "rounded-[100px] px-3 h-full flex justify-center items-center",
      {
        "bg-primary text-white ": isEqual(
          get(filterData, get(item, "slug")),
          id
        )
      }
    );
  };
  return (
    <div className="flex h-11 py-1 px-1 gap-1 items-center flex-nowrap bg-gray-50 rounded-[100px] whitespace-nowrap cursor-pointer text-base font-mi-sans-semi-bold">
      {map(get(filterItem, "items"), (item) => {
        return map(get(item, "items"), (subItem, index) => {
          return (
            <span
              key={index}
              className={toggleItemClass(get(subItem, "id"), item)}
              onClick={() =>
                handleFilter(
                  get(item, "slug"),
                  get(subItem, "id"),
                  get(filterItem, "type")
                )
              }>
              {get(subItem, "title")}
            </span>
          );
        });
      })}
    </div>
  );
};

export default Switch;
