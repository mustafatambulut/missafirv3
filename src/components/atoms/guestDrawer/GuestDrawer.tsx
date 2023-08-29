"use client";
import { get } from "lodash";
import { useAppSelector } from "@/redux/hooks";

import { IGuestDrawer } from "@/components/atoms/guestDrawer/types";

import Button from "@/components/atoms/button/Button";

import GuestsIcon from "../../../../public/images/guests.svg";
import SearchIconWhite from "../../../../public/images/search_white.svg";

const GuestDrawer = ({
  onClick,
  className = "",
  handleFilterListings,
  isInCustomSection = false
}: IGuestDrawer) => {
  const { bookingGuests } = useAppSelector((state) => state.listingReducer);
  return (
    <div
      className={` ${
        isInCustomSection ? "mb-0" : "mb-3 lg:mb-0 flex-1 w-full"
      }  ${className}`}>
      <div className="flex">
        <label
          htmlFor="msfr-search-drawer"
          onClick={onClick}
          className={`drawer-button py-1 ${
            isInCustomSection ? "h-9" : "h-14 px-4"
          } bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700`}>
          <div className="flex">
            <div className="flex items-center text-base">
              <GuestsIcon
                className={`${
                  isInCustomSection ? "mr-1 scale-75" : "mr-3"
                } fill-gray-700`}
              />
              <div className="flex flex-col items-start">
                <span
                  className={`${isInCustomSection ? "text-xs" : "text-base"}`}>
                  Guests
                </span>
                {get(bookingGuests, "adults") ||
                get(bookingGuests, "kids") ||
                get(bookingGuests, "pets") ? (
                  <div
                    className={`flex font-mi-sans-semi-bold ${
                      isInCustomSection ? "text-sm" : "text-lg"
                    }`}>
                    {(get(bookingGuests, "adults") > 0 ||
                      get(bookingGuests, "kids") > 0) && (
                      <span className="mr-2 whitespace-nowrap">
                        {get(bookingGuests, "adults") +
                          get(bookingGuests, "kids")}{" "}
                        Guests
                      </span>
                    )}

                    {get(bookingGuests, "pets") === 1 && (
                      <span className="mr-2 whitespace-nowrap">Pets</span>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </label>
        {!isInCustomSection && (
          <Button
            onClick={handleFilterListings}
            variant="btn-primary"
            className="rounded-2xl !h-[58px] ml-3 w-[72px] lg:w-auto">
            <SearchIconWhite />
          </Button>
        )}
      </div>
    </div>
  );
};

export default GuestDrawer;
