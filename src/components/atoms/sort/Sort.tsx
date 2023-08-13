"use client";
import { get, map } from "lodash";
import classNames from "classnames";

import { ISort } from "@/components/atoms/sort/types";

const Sort = ({ filterData, setFilterData, setIsDropdownOpen }: ISort) => {
  const sortItemClass = (value: string) => {
    return classNames("text-gray-500 text-base font-mi-sans-semi-bold", {
      "text-primary": get(filterData, "sort") === value
    });
  };

  //todo: dil seçeneği ekleyince güncellenecek
  const mockSortData = [
    {
      title: "Tümü",
      value: "all"
    },
    {
      title: "Artan Fiyat",
      value: "ascPrice"
    },
    {
      title: "Azalan Fiyat",
      value: "descPrice"
    },
    {
      title: "Yeniden Eskiye",
      value: "ascDate"
    },
    {
      title: "Eskiden Yeniye",
      value: "descDate"
    },
    {
      title: "Çok Değerlendirilenler",
      value: "mostReview"
    },
    {
      title: "Yeni Eklenenler",
      value: "new"
    }
  ];

  const handleFilter = (sort: string) => {
    setFilterData((prev) => ({
      ...prev,
      sort: sort
    }));
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="grid grid-rows-1 gap-3 ">
      {map(mockSortData, (item, key) => (
        <div
          key={key}
          className={sortItemClass(get(item, "value"))}
          onClick={() => handleFilter(get(item, "value"))}>
          {get(item, "title")}
        </div>
      ))}
    </div>
  );
};

export default Sort;
