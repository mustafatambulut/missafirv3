"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { get, toInteger } from "lodash";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";

import { IGuests } from "@/components/atoms/guests/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateBookingGuests } from "@/redux/features/listingSlice/listingSlice";

import Typography from "../typography/Typography";

import PlusIcon from "../../../../public/images/plus.svg";
import MinusIcon from "../../../../public/images/minus.svg";
import GuestsIcon from "../../../../public/images/guests.svg";
import ChevronDown from "../../../../public/images/chevron_down.svg";

const Guests = ({
  className = "",
  showIcon = true,
  listClassName = "",
  isInCustomSection = false,
  isInMobileDrawer = false,
  isInListingDetail = false,
  customOpenHandler = null,
  customOpenStatement = null
}: IGuests) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bodyClass = classNames(
    `dropdown text-gray-800 w-full text-left rounded-2xl ${className}`
  );

  const selectorClass = classNames("cursor-pointer w-full flex items-center", {
    "border bg-white z-10": isInListingDetail,
    "h-10": isInCustomSection,
    "h-14": !isInCustomSection,
    "rounded-2xl": !isInListingDetail,
    "rounded-lg justify-between px-4": isInListingDetail,
    "text-gray-600": isInListingDetail
  });

  const listClass = classNames(
    `left-0 dropdown-content menu z-[1] shadow bg-base-100 rounded-box ${listClassName}`,
    {
      "w-auto": isInCustomSection,
      "w-full": !isInCustomSection || isInMobileDrawer,
      "mt-6": !isMobile && !isInListingDetail,
      "mt-4":
        (isMobile && !isInMobileDrawer) || (!isMobile && isInListingDetail),
      "shadow-none p-0": isInMobileDrawer,
      "p-2": !isInMobileDrawer && !isInListingDetail,
      "visible opacity-100 scale-100 relative":
        isInMobileDrawer || (isInListingDetail && isDropdownOpen),
      "px-1": isInListingDetail && isDropdownOpen
    }
  );

  const listItemClass = classNames(
    "flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800",
    {
      "px-0": isInMobileDrawer
    }
  );

  const changeAdults = (type: string) => {
    if (type === "plus") {
      dispatch(
        updateBookingGuests({
          ...bookingGuests,
          adults: bookingGuests.adults + 1
        })
      );
    } else {
      get(bookingGuests, "adults") > 1 &&
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

  const handleClickLabel = () => {
    customOpenHandler && customOpenHandler();
    !isInMobileDrawer && setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    customOpenStatement && customOpenStatement !== "guests"
      ? setIsDropdownOpen(false)
      : null;
  }, [customOpenStatement]);

  useEffect(() => {
    isMobile && !isInListingDetail && setIsDropdownOpen(true);
  }, []);

  return (
    <div className={bodyClass}>
      <label tabIndex={0} className={selectorClass} onClick={handleClickLabel}>
        {showIcon && <GuestsIcon className="hidden lg:block fill-gray-700" />}
        <div
          className={`flex flex-col ${!isInListingDetail && "lg:ml-3 "} ${
            isInCustomSection && "w-[6.6rem] truncate"
          }`}>
          <Typography
            variant="h5.1"
            element="span"
            className={`${
              isInCustomSection
                ? "lg:text-base"
                : get(bookingGuests, "adults") ||
                  get(bookingGuests, "kids") ||
                  get(bookingGuests, "pets")
                ? "text-base"
                : "text-21"
            } text-gray-600 ${
              (isMobile &&
                (get(bookingGuests, "adults") ||
                  get(bookingGuests, "kids") ||
                  get(bookingGuests, "pets"))) ||
              (((isInCustomSection && get(bookingGuests, "adults")) ||
                get(bookingGuests, "kids") ||
                get(bookingGuests, "pets")) &&
                "hidden")
            }`}>
            {!isInListingDetail
              ? isInCustomSection
                ? t("add_guests")
                : t("guests")
              : null}
          </Typography>
          <div className="flex">
            {toInteger(get(bookingGuests, "adults")) > 0 ||
            toInteger(get(bookingGuests, "kids")) > 0 ? (
              <Typography
                variant="p3"
                element="span"
                className="mr-2 whitespace-nowrap">
                {toInteger(get(bookingGuests, "adults")) +
                  toInteger(get(bookingGuests, "kids"))}
                <span className="ml-1">
                  {toInteger(get(bookingGuests, "adults")) +
                    toInteger(get(bookingGuests, "kids")) ===
                  1
                    ? t("guest")
                    : t("guests")}
                </span>
                {toInteger(get(bookingGuests, "pets")) === 1 ? ", " : null}
              </Typography>
            ) : null}

            {toInteger(get(bookingGuests, "pets")) === 1 ? (
              <Typography
                variant="p3"
                element="span"
                className="mr-2 whitespace-nowrap">
                {t("pets")}
              </Typography>
            ) : null}
          </div>
        </div>
        {isInListingDetail && (
          <ChevronDown
            className={`fill-gray-600 scale-125 ${
              isDropdownOpen && "rotate-180"
            }`}
          />
        )}
      </label>
      {isDropdownOpen && (
        <ul tabIndex={0} className={listClass}>
          <li className="mb-5 lg:mb-0">
            <div className={listItemClass}>
              <div className="flex flex-col">
                <Typography variant="p3" element="span" className="text-lg">
                  {t("adults")}
                </Typography>
                <Typography
                  variant="p4"
                  element="span"
                  className="text-gray-500 whitespace-nowrap">
                  ({t("over18")})
                </Typography>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="border border-gray-800 rounded-full flex items-center justify-center"
                  onClick={() => changeAdults("minus")}>
                  <MinusIcon className="cursor-pointer" />
                </div>
                <Typography variant="p3" element="span" className="mx-2">
                  {get(bookingGuests, "adults")}
                </Typography>
                <div
                  className="border border-gray-800 rounded-full flex items-center justify-center"
                  onClick={() => changeAdults("plus")}>
                  <PlusIcon className="cursor-pointer w-[16px]" />
                </div>
              </div>
            </div>
          </li>
          <li className="mb-5 lg:mb-0">
            <div className={listItemClass}>
              <div className="flex flex-col">
                <Typography variant="p3" element="span">
                  {t("kids")}
                </Typography>
                <Typography
                  variant="p4"
                  element="span"
                  className="text-gray-500 whitespace-nowrap">
                  ({t("0_17")})
                </Typography>
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
            <div className={listItemClass}>
              <Typography variant="p3" element="span" className="text-lg">
                {t("pets")}
              </Typography>
              <input
                type="checkbox"
                checked={Boolean(get(bookingGuests, "pets"))}
                className="toggle"
                onChange={changePets}
              />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Guests;
