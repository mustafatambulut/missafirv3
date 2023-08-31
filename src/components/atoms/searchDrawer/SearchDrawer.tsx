"use client";
import { get } from "lodash";
import { ISearchDrawer } from "@/components/atoms/searchDrawer/types";

import SearchIcon from "../../../../public/images/search.svg";
import { useAppSelector } from "@/redux/hooks";

const SearchDrawer = ({
  onClick,
  className = "",
  isInCustomSection
}: ISearchDrawer) => {
  const { bookingDestination } = useAppSelector(
    (state) => state.listingReducer
  );
  return (
    <div
      className={`${
        isInCustomSection ? "mb-0" : "mb-3 lg:mb-0 flex-1 w-full"
      }  ${className}`}>
      <label
        htmlFor="msfr-search-drawer"
        onClick={onClick}
        className={`drawer-button py-1 ${
          isInCustomSection ? "h-9" : "h-14 px-4"
        } bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700`}>
        <div className="flex items-center">
          <SearchIcon
            className={`${
              isInCustomSection ? "mr-1 scale-75" : "mr-3"
            } fill-gray-800`}
          />
          <div className="flex flex-col items-start">
            <span className={`${isInCustomSection ? "text-xs" : "text-base"}`}>
              Where?
            </span>
            {bookingDestination && (
              <div
                className={`font-mi-sans-semi-bold truncate w-12 ${
                  isInCustomSection ? "text-sm" : "text-lg"
                }`}>
                {get(bookingDestination, "label")}
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SearchDrawer;
