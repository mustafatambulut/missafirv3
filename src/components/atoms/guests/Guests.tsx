"use client";
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateBookingGuests } from "@/redux/features/listingSlice/listingSlice";

import PlusIcon from "../../../../public/images/plus.svg";
import MinusIcon from "../../../../public/images/minus.svg";
import GuestsIcon from "../../../../public/images/guests.svg";
import {IBookingGuests} from "@/components/atoms/guests/types";

const Guests = ({ isInCustomSection = false }: IBookingGuests) => {
  const dispatch = useAppDispatch();
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const changeAdults = (type: string) => {
    if (type === "plus") {
      dispatch(
        updateBookingGuests({
          ...bookingGuests,
          adults: bookingGuests.adults + 1
        })
      );
    } else {
      get(bookingGuests, "adults") > 0 &&
        dispatch(
          updateBookingGuests({
            ...bookingGuests,
            adults: bookingGuests.adults - 1
          })
        );
    }
  };

  const changeKids = (type: string) => {
    if (type === "plus") {
      dispatch(
        updateBookingGuests({ ...bookingGuests, kids: bookingGuests.kids + 1 })
      );
    } else {
      get(bookingGuests, "kids") > 0 &&
        dispatch(
          updateBookingGuests({
            ...bookingGuests,
            kids: bookingGuests.kids - 1
          })
        );
    }
  };

  const changePets = () => {
    dispatch(
      updateBookingGuests({
        ...bookingGuests,
        pets: Number(!bookingGuests.pets)
      })
    );
  };

  useEffect(() => {
    isMobile && setIsDropdownOpen(true);
  }, []);

  return (
    <div
      className={`dropdown text-gray-800 w-full ${
        isInCustomSection ? "h-10 lg:px-2" : "h-14 lg:px-4"
      } text-left rounded-2xl lg:focus-within:bg-gray-50`}>
      <label
        tabIndex={0}
        className={`cursor-pointer w-full flex items-center ${
          isInCustomSection ? "h-10" : "h-14"
        } lg:h-full`}
        onClick={() => !isMobile && setIsDropdownOpen(!isDropdownOpen)}>
        <GuestsIcon className="hidden lg:block fill-gray-700" />
        <div className="flex flex-col lg:ml-3">
          <span
            className={`${
              isInCustomSection ? "lg:text-base" : "text-21"
            } text-gray-600 ${
              isMobile &&
              (get(bookingGuests, "adults") ||
                get(bookingGuests, "kids") ||
                get(bookingGuests, "pets")) &&
              "hidden"
            }`}>
            Guests
          </span>
          <div className="flex">
            {(get(bookingGuests, "adults") > 0 ||
              get(bookingGuests, "kids") > 0) && (
              <span className="mr-2 whitespace-nowrap">
                {get(bookingGuests, "adults") + get(bookingGuests, "kids")}
                <span className="ml-1">Guests</span>
                {get(bookingGuests, "pets") === 1 && ", "}
              </span>
            )}

            {get(bookingGuests, "pets") === 1 && (
              <span className="mr-2 whitespace-nowrap">Pets</span>
            )}
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className={`left-0 ${
          !isMobile
            ? `dropdown-content menu z-[1] p-2 shadow bg-base-100 rounded-box ${
                isInCustomSection ? "w-auto" : "w-full "
              } mt-6`
            : "mt-4"
        } `}>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <span className="text-lg">Adults</span>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                (over 18)
              </span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(bookingGuests, "adults")}</span>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("plus")}>
                <PlusIcon className="cursor-pointer w-[16px]" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <span className="text-lg">Kids</span>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                (0-17)
              </span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(bookingGuests, "kids")}</span>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("plus")}>
                <PlusIcon className="cursor-pointer w-[16px]" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <span className="text-lg">Pets</span>
            <input
              type="checkbox"
              checked={Boolean(get(bookingGuests, "pets"))}
              className="toggle"
              onChange={changePets}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Guests;
