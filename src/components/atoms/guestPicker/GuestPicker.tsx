import { useEffect, useState } from "react";
import { get } from "lodash";
import { isMobile } from "react-device-detect";

import { IGuestPicker } from "@/components/atoms/guestPicker/types";

import PlusIcon from "../../../../public/images/plus.svg";
import MinusIcon from "../../../../public/images/minus.svg";
import GuestsIcon from "../../../../public/images/guests.svg";

const GuestPicker = ({
  data,
  bodyClass = "",
  labelClass = "",
  className = "",
  contentClass = "",
  setBookingGuests
}: IGuestPicker) => {
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

  const changePets = () => setBookingGuests((v) => ({ ...v, pets: !v.pets }));

  useEffect(() => {
    isMobile && setIsDropdownOpen(true);
  }, []);

  const ListComponent = () => {
    return (
      <li className="mb-5 lg:mb-0">
        <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
          <div className="flex flex-col">
            <span className="text-sm lg:text-lg">Adults</span>
            <span className="text-gray-500 text-sm">(over 18)</span>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="border border-gray-800 rounded-full flex items-center justify-center"
              onClick={() => changeAdults("minus")}>
              <MinusIcon className="cursor-pointer" />
            </div>
            <span className="mx-2">{get(data, "adults")}</span>
            <div
              className="border border-gray-800 rounded-full flex items-center justify-center"
              onClick={() => changeAdults("plus")}>
              <PlusIcon className="cursor-pointer w-4" />
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={`dropdown w-full ${className}`}>
      <label
        tabIndex={0}
        className={`cursor-pointer w-full flex items-center h-14 lg:h-full ${labelClass}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {!isMobile && <GuestsIcon />}
        <div className="flex flex-col lg:ml-3">
          <span
            className={`text-sm text-gray-600 ${
              isMobile &&
              (get(data, "adults") || get(data, "kids") || get(data, "pets")) &&
              "hidden"
            }`}>
            Guests
          </span>
          <div className={`flex ${contentClass}`}>
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
      <ul tabIndex={0} className={`left-0 dropdown-content menu ${bodyClass}`}>
        <ListComponent/>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <span className="text-sm lg:text-lg">Adults</span>
              <span className="text-gray-500 text-sm">(over 18)</span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(data, "adults")}</span>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("plus")}>
                <PlusIcon className="cursor-pointer w-4" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <span className="text-lg">Kids</span>
              <span className="text-gray-500 text-sm">(0-17)</span>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <span className="mx-2">{get(data, "kids")}</span>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("plus")}>
                <PlusIcon className="cursor-pointer w-4" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <span className="text-lg">Pets</span>
            <input type="checkbox" className="toggle" onChange={changePets} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GuestPicker;
