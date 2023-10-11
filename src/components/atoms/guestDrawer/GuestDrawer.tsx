"use client";
import { get } from "lodash";
import { useAppSelector } from "@/redux/hooks";

import { IGuestDrawer } from "@/components/atoms/guestDrawer/types";

import Button from "@/components/atoms/button/Button";

import GuestsIcon from "../../../../public/images/guests.svg";
import SearchIconWhite from "../../../../public/images/search_white.svg";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const GuestDrawer = ({
  onClick,
  className = "",
  handleFilterListings,
  isInCustomSection = false
}: IGuestDrawer) => {
  const { bookingGuests, searchClicked } = useAppSelector(
    (state) => state.listingReducer
  );
  const t = useTranslations();
  return (
    <div
      className={` ${isInCustomSection ? "mb-0" : "mb-3 lg:mb-0 flex-1 w-full"
        }  ${className}`}>
      <div className="flex">
        <label
          htmlFor="msfr-search-drawer"
          onClick={onClick}
          className={`drawer-button py-1 ${isInCustomSection ? "h-9" : "h-14 px-4"
            } bg-white cursor-pointer w-full rounded-2xl flex items-center text-gray-700`}>
          <div className="flex">
            <div className="flex items-center text-base">
              <GuestsIcon
                className={`${isInCustomSection ? "mr-1 scale-75" : "mr-3"
                  } fill-gray-700`}
              />
              <div className="flex flex-col items-start">
                <Typography
                  variant="p3"
                  element="span"
                  className={`${isInCustomSection ? "text-xs text-gray-600" : "text-base"
                    }`}>
                  {isInCustomSection ? t("add_guests") : t("guests")}
                </Typography>
                {get(bookingGuests, "adults") ||
                  get(bookingGuests, "kids") ||
                  get(bookingGuests, "pets") ? (
                  <div
                    className={`flex font-mi-sans-semi-bold ${isInCustomSection ? "text-sm" : "text-lg"
                      }`}>
                    {get(bookingGuests, "adults") > 0 ||
                      get(bookingGuests, "kids") > 0 ? (
                      <Typography variant="p3" element="span" className="mr-2 whitespace-nowrap">
                        {get(bookingGuests, "adults") > 0
                          ? get(bookingGuests, "adults")
                          : null}
                        {get(bookingGuests, "kids") > 0
                          ? ` ${get(bookingGuests, "kids")}`
                          : null}
                        <Typography
                          variant="p3"
                          element="span"
                          className="ml-1">{t("guests")}</Typography>
                      </Typography>
                    ) : null}

                    {get(bookingGuests, "pets") === 1 ? (
                      <Typography
                        variant="p3"
                        element="span"
                        className="mr-2 whitespace-nowrap">
                        {t("pets")}
                      </Typography>
                    ) : null}
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
            {searchClicked ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <SearchIconWhite />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GuestDrawer;
