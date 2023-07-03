"use client";
import React, { useEffect, useState } from "react";
import { get } from "lodash";

import { isMobileView } from "@/utils/helper";

import MinusIcon from "../../../../public/images/minus.svg";
import PlusIcon from "../../../../public/images/plus.svg";
import GuestsIcon from "../../../../public/images/guests.svg";
import { IBookingGuests } from "@/components/atoms/guests/types";

const Guests = ({ setBookingGuests, data }: IBookingGuests) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const changeAdults = (type: string) => {
    if (type === "plus") {
      setBookingGuests((v) => ({ ...v, adults: v.adults + 1 }));
    } else {
      get(data, "adults") > 0 &&
        setBookingGuests((v) => ({ ...v, adults: v.adults - 1 }));
    }
  };

  const changeKids = (type: string) => {
    if (type === "plus") {
      setBookingGuests((v) => ({ ...v, kids: v.kids + 1 }));
    } else {
      get(data, "kids") > 0 &&
        setBookingGuests((v) => ({ ...v, kids: v.kids - 1 }));
    }
  };

  const changePets = () => {
    setBookingGuests((v) => ({ ...v, pets: !v.pets }));
  };

  useEffect(() => {
    isMobileView() && setIsDropdownOpen(true);
  }, []);
  return (
    <div className="dropdown text-grey-800 w-full !h-[56px] text-left rounded-2xl lg:px-4 lg:focus-within:bg-grey-50">
      <label
        tabIndex={0}
        className="cursor-pointer w-full flex items-center !h-[56px] lg:h-full"
        onClick={() => !isMobileView() && setIsDropdownOpen(!isDropdownOpen)}>
        <GuestsIcon className="hidden lg:block" />
        <div className="flex flex-col lg:ml-3">
          <span
            className={`${
              isMobileView() &&
              (get(data, "adults") || get(data, "kids") || get(data, "pets")) &&
              "hidden"
            }`}>
            Guests
          </span>
          <div className="flex">
            {get(data, "adults") > 0 && (
              <span className="mr-2">{get(data, "adults")} Adults</span>
            )}
            {get(data, "kids") > 0 && (
              <span className="mr-2">{get(data, "kids")} Kids</span>
            )}
            {get(data, "pets") && <span className="mr-2">Pets</span>}
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className={`left-0 ${
          !isMobileView()
            ? "dropdown-content menu z-[1] p-2 shadow bg-base-100 rounded-box w-full mt-6"
            : "mt-4"
        } `}>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-grey-800">
            <div className="flex flex-col">
              <span className="text-lg">Adults</span>
              <span className="text-grey-500 text-sm">(over 18)</span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-grey-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(data, "adults")}</span>
              <div
                className="border border-grey-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("plus")}>
                <PlusIcon className="cursor-pointer w-[16px]" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-grey-800">
            <div className="flex flex-col">
              <span className="text-lg">Kids</span>
              <span className="text-grey-500 text-sm">(0-17)</span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-grey-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(data, "kids")}</span>
              <div
                className="border border-grey-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("plus")}>
                <PlusIcon className="cursor-pointer w-[16px]" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-grey-800">
            <span className="text-lg">Pets</span>
            <input type="checkbox" className="toggle" onChange={changePets} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Guests;
